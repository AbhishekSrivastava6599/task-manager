const fs = require('node:fs');
const express = require('express');
const { log } = require('node:console');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Read the json file and store it's content in an array of objects
function readTasksFromFile() {
    try {
      const rawData = fs.readFileSync('task.json');
      const tasks = JSON.parse(rawData);
      return tasks;
    } catch (error) {
      console.error('Error reading task.json:', error.message);
      return []; // Return an empty array if there's an error like file does not exist or is not a valid JSON
    }
  }

  const tasksArray = readTasksFromFile().tasks;
//   console.log('Tasks read from file:', tasks);

// --------------Routes--------------

// GET /tasks: Retrieve all tasks
app.get('/tasks', (req, res) => {
  try {
    console.log(`--GET /tasks endpoint called`);
    res.json(tasksArray);
  } catch (error) {
    console.error('Error handling request:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /tasks/:id: Retrieve a single task by its ID
app.get('/tasks/:id', (req, res) => {
  try {
    console.log(`--GET /tasks/:id endpoint called`);
    const taskId = parseInt(req.params.id); // Convert the ID parameter to an integer
    const task = tasksArray.find((t) => t.id === taskId);

    if (!task) {
      // Task with the specified ID not found
      return res.status(404).json({ error: 'Task not found.' });
    }

    // Task found
    res.json(task);
  } catch (error) {
    console.error('Error handling request:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /tasks: Create a new task
app.post('/tasks', (req, res) => {
  try {
    console.log(`--POST /tasks endpoint called`);
    // Validate request body
    const { title, description, completed } = req.body;
    if (!title || !description || typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Invalid request. Please provide valid task details.' });
    }

    // Generate a new task ID
    const newTaskId = tasksArray.length + 1;

    const newTask = {
      id: newTaskId,
      title,
      description,
      completed,
    };

    // Add the new task to the tasks array
    tasksArray.push(newTask);
    // console.log(tasksArray)
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error handling request:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;