import express from "express";
import "express-async-errors";
import prisma from "./prismaClient";
import {getValidIdOr404} from "./utils/getValidIdOr404";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ok");
});

app.get("/todo/:id", async (req, res) => {
  const id = getValidIdOr404(req, res);

  let todo = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send(`Todo with ID ${id} was not found.`);
  }
});

app.post("/todo", async (req, res) => {
  const { title, description } = req.body;
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
    },
  });
  res.status(201).json(todo);
});

app.patch("/todo/:id", async (req, res) => {
  const id = getValidIdOr404(req, res);
  const { title, description, completed } = req.body;
  const todo = await prisma.todo.update({
    where: { id },
    data: {
      title,
      description,
      completed,
      closedAt: completed && new Date().toISOString() || null,
    },
  });
  res.json(todo);
});

app.delete("/todo/:id", async (req, res) => {
  const id = getValidIdOr404(req, res);
  await prisma.todo.delete({
    where: {
      id,
    },
  });
  res.status(204).send();
});

app.get("/todo", async (req, res) => {
  const page = Number(req.query.page) || 1;
  if (page < 1) {
    res.status(404).send(`Invalid page - page must be a positive number.`);
  }
  const todosPerPage = 5;
  const todos = await prisma.todo.findMany({
    orderBy: {
      id: "desc",
    },
    skip: todosPerPage * (page - 1),
    take: todosPerPage,
  });
  res.status(200).json(todos);
});

app.use((err, req, res, next) => {
  const date = new Date();
  console.log(`${date.toISOString()} - ${err}`);
  res.status(500).send("Something broke!");
});

export default app;