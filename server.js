const express = require('express');
const cors = require('cors');
const app = express();

const port = 3200;
app.use(cors()); // Enable CORS for all origins
app.use(express.json());

let tasks = [
  {
    id: "1721899652351",
    taskName: "test 4545",
    taskDescription: "ok tested",
    completed: true
  },
  {
    id: "1721905921838",
    taskName: "test4",
    taskDescription: "ftst",
    completed: false
  },
  {
    id: "17219059252838",
    taskName: "test45",
    taskDescription: "ftst",
    completed: false
  },
  {
    id: "1721911258869",
    taskName: "fe",
    taskDescription: "fsa",
    completed: false
  }
];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get a single task by id
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Create a new task
app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now().toString(),
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    completed: req.body.completed || false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (task) {
    task.taskName = req.body.taskName;
    task.taskDescription = req.body.taskDescription;
    task.completed = req.body.completed;
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Task not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
