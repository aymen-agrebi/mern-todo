const express = require("express");
const mongoose = require("mongoose");

const app = express();
const Todo = require("./models/Todo");

mongoose
  .connect(
    "mongodb+srv://aymen:polm1213@cluster0.veqss.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/api/", (req, res, next) => {
  res.status(200).send("Welcome to mern todo");
});

app.post("/api/todos", (req, res, next) => {
  // delete req.body.id;
  const todo = new Todo({
    ...req.body,
  });
  todo
    .save()
    .then(() => res.status(201).json({ todo: todo }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/todos", (req, res, next) => {
  Todo.find()
    .then((todos) => res.status(200).json({ todos }))
    .catch((error) => res.status(400).json({ error }));
});

app.delete("/api/todos/:id", (req, res, next) => {
  Todo.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.put("/api/todos/:id", (req, res, next) => {
  console.log(req.body);
  Todo.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ ...req.body, _id: req.params.id }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
