# Task Manager API
This is a simple RESTful API for managing tasks, built with Node.js and Express.

## Prerequisites
1. Node.js
2. NPM

## Routes
### `GET /tasks`
- Description: Retrieve all tasks.
- Response: `200 OK` JSON array of tasks. `500 Internal Server Error` Internal server error.
- Example:
```json
[
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description 1",
    "completed": false
  },
  {
    "id": 2,
    "title": "Task 2",
    "description": "Description 2",
    "completed": true
  }
]
```

### `GET /tasks/:id`
- Description: Retrieve a single task by its ID.
- Parameters: `id` Task ID(integer) -> The ID of the task to retrieve.
- Response: `200 OK` If task found. `404 Not Found` If task not found. `500 Internal Server Error` Internal server error.
- Example:
```json
{
  "id": 1,
  "title": "Task 1",
  "description": "Description 1",
  "completed": false
}
```

### `POST /tasks`
- Description: Create a new task.
- Request Body: `title` Task title (string, required). `description` Task description (string, required). `completed` Task completion status (boolean, required).
- Response: `201 Created` If task created successfully. `400 Bad Request` If request body is invalid. `500 Internal Server Error` Internal server error.
- Example:
```json
{
  "id": 3,
  "title": "New Task",
  "description": "New Description",
  "completed": false
}
```

### `PUT /tasks/:id`
- Description: Update an existing task by its ID.
- Parameters: `id` Task ID(integer) -> The ID of the task to retrieve.
- Request Body: `title` Updated task title (string). `description` Updated task description (string). `completed` Updated task completion status (boolean).
- Response: `200 OK` If task updated successfully. `404 Not Found` If task not found. `400 Bad Request` If request body is invalid. `500 Internal Server Error` Internal server error. `Body` Updated task object.
- Example:
```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated Description",
  "completed": true
}
```

### `DELETE /tasks/:id`
- Description: Delete a task by its ID.
- Parameters: `id` Task ID(integer) -> The ID of the task to retrieve.
- Response: `200 OK` JSON object of the deleted task. `404 Not Found` If task not found. `500 Internal Server Error` Internal server error.
- Example: 
```json
{
  "id": 1,
  "title": "Deleted Task",
  "description": "Deleted Description",
  "completed": false
}
```

## Error Handling
### `400` `Bad Request`
- Description: Returned when the request payload is incorrect.
- Response:
```json
    {
    "error": "Invalid request. Please provide valid task details."
    }
```

### `404` `Not Found` 
- Description: Returned when the requested task ID does not exist.
- Response:
```json
    {
    "error": "Task not found."
    }
```

### `500` `Internal Server Error`
- Description: Returned when an internal error occurs.
- Response:
```json
{
  "error": "Internal server error."
}
```

## Usage
1. Clone this repository.
2. Install dependencies using npm install.
3. Start the server using npm run start.
4. Access the API endpoints as described above.