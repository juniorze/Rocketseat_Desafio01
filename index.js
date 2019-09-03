const express = require("express");

const app = express();
app.use(express.json());

let numberOnRequest = 0;

const projects = [];

function countNumberRequest(req, res, next) {
  numberOnRequest++;

  console.log(`Number of Requests ${numberOnRequest}`);

  next();
}

app.use(countNumberRequest);

function validIDcontains(req, res, next) {
  const { index } = req.params;
  const project = projects.find(a => a.id == index);

  if (!project) {
    return res.status(400).json({ error: "Project not found!" });
  }

  next();
}

app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    task: []
  };

  projects.push(project);

  return res.json(projects);
});

app.put("/projects/:index", validIDcontains, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  const project = projects.find(a => a.id == index);

  project.title = title;

  return res.json(project);
});

app.delete("/projects/:index", validIDcontains, (req, res) => {
  const { index } = req.params;

  const project = projects.findIndex(a => a.id == index);

  projects.splice(project, 1);

  return res.json(projects);
});

app.post("/projects/:index/tasks", validIDcontains, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  const project = projects.find(a => a.id == index);

  project.task.push(title);

  return res.json(project);
});

app.listen("3333");
