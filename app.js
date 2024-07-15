const fs = require('node:fs');
const express = require('express');
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

  const tasks = readTasksFromFile();
//   console.log('Tasks read from file:', tasks);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;