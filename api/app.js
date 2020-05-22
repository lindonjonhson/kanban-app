const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Database connection
const { mongoose } = require('./db/mongoose');

// Load models
const { Board } = require('./db/models/board.model');
const { Column } = require('./db/models/column.model');
const { Task } = require('./db/models/task.model');


// Middleware
app.use(bodyParser.json());

// Cors headers
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

// End middleware

// Route handlers

// BOARD routes

/**
 * GET /board
 * Purpose: Get all board
 */

app.get("/boards", (req, res) => {
    // Return an array of  the lists in the database that belong to the authenticated user
    Board.find().then((lists)=>{
        res.send(lists); 
    }).catch((e) => {
        res.send(e);
    });
});

/**
 * GET /board/:boardId
 * Purpose: Get one board
 */

app.get("/boards/:boardId", (req, res) => {
    // Find one particular task
    Board.findOne(
        { 
            _id: req.params.boardId
        }
    ).then((list) => {
        res.send(list);
    });
});

/**
 * POST /board
 * Purpose: Create new board
 */
app.post("/boards", (req, res) => {
    // Create a new board and return the new board document back to the user, which includes the id
    // Board information will be passed in via JSON request body
    let title = req.body.title;
    let newBoard = new Board({
        title
    });
    newBoard.save().then((boardDoc) => {
        res.send(boardDoc);
    });
});

/**
 * PATCH /boards/:id
 * Purpose: Update specified board
 */
app.patch("/boards/:id", (req, res) => {
    // We want to update the specified list ( list document with id in the URL ) with new values specified in the JSON body

    Board.findOneAndUpdate(
        // Search Statement
        { _id: req.params.id },
        // Update Statement
        { $set: req.body}
        // We are using req.params.id, because the id will come through the url
        // "$set" will get the whole object List, so the method will update all the informations
    ).then(() => { 
        res.send({ 'message': 'changes applied successfully'});
    });
});

/**
 * DELETE /boards/:id
 * Purpose: Delete specified list
 */
app.delete("/boards/:id", (req, res) => {
    // We want to delete the specified list ( list document with id in the URL )
    Board.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);

        // delete all the tasks that are on the deleted list
        // deleteTasksFromList(removedListDoc._id);
    });
});

// END board routes

// COLUMN routes

/**
 * GET /board
 * Purpose: Get all columns
 */

app.get("/boards/:boardId/columns", (req, res) => {
    // Return an array of  the boards in the database that belong to the authenticated user
    Column.find({
        _boardId: req.params.boardId
    }).then((columns)=>{
        res.send(columns); 
    }).catch((e) => {
        res.send(e);
    });
});

/**
 * GET /boards/:boardId/columns/:columnId
 * Purpose: Get one particular column
 */

app.get("/boards/:boardId/columns/:id", (req, res) => {
    // Find one particular task
    Column.findOne(
        { 
            _id: req.params.id,
            _boardId: req.params.boardId
        }
    ).then((column) => {
        console.log(column);
        res.send(column);
    });
});

/**
 * POST /boards/:boardId/columns
 * Purpose: Create new column with the "boardId"
 */
app.post("/boards/:boardId/columns", (req, res) => {
    // Create a new column and return the new column document back to the user, which includes the id
    // Column information will be passed in via JSON request body

    let newColumn = new Column({
        title: req.body.title,
        _boardId: req.params.boardId
    })
    newColumn.save().then((columnDoc) => {
        res.send(columnDoc);
    });
});

/**
 * PATCH /boards/:boardId/columns
 * Purpose: Create new column with the "boardId"
 */
app.patch("/boards/:boardId/columns/:id", (req, res) => {
    // Create a new column and return the new column document back to the user, which includes the id
    // Column information will be passed in via JSON request body

    // 
    Column.findOneAndUpdate({ 
            _id: req.params.id,
            _boardId: req.params.boardId
    }, { $set: req.body}
    ).then(() => {
        res.send({message: "Update completed"});
    });
});

/**
 * DELETE /boards/:boardId/columns/:id
 * Purpose: Delete specified task
 */
app.delete("/boards/:boardId/columns/:id", (req, res) => {

    Column.findOneAndRemove({
        _id: req.params.id,
        _boardId: req.params.boardId
    }).then((removedDoc) => {
        res.send(removedDoc);
    });
});

// END column routes

// TASK routes

/**
 * GET /boards/:boardId/columns/:columnId/tasks
 * Purpose: Get all tasks
 */

app.get("/boards/:boardId/columns/:columnId/tasks", (req, res) => {
    // Return an array of  the tasks in the database that belong to the authenticated user
    Task.find({
        _columnId: req.params.columnId
    }).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.send(e);
    });
});

/**
 * GET /boards/:boardId/columns/:columnId/tasks/:id
 * Purpose: Get one particular task
 */

app.get("/boards/:boardId/columns/:columnId/tasks/:id", (req, res) => {
    // Find one particular task
    Task.findOne(
        { 
            _id: req.params.id,
            _columnId: req.params.columnId
        }
    ).then((task) => {
        res.send(task);
    });
});

/**
 * POST /boards/:boardId/columns/:columnId/tasks
 * Purpose: Create new task with the "columnId"
 */
app.post("/boards/:boardId/columns/:columnId/tasks", (req, res) => {
    // Create a new task and return the new task document back to the user, which includes the id
    // Column information will be passed in via JSON request body

    let newTask = new Task({
        title: req.body.title,
        _columnId: req.params.columnId
    })

    newTask.save().then((taskDoc) => {
        res.send(taskDoc);
    });
});

/**
 * PATCH /boards/:boardId/columns/:columnId/tasks/:id
 * Purpose: Update task with the "id"
 */
app.patch("/boards/:boardId/columns/:columnId/tasks/:id", (req, res) => {
    
    Task.findOneAndUpdate({ 
            _id: req.params.id,
            _columnId: req.params.columnId
    }, { $set: req.body}
    ).then(() => {
        res.send({message: "Update completed"});
    });
});

/**
 * DELETE /boards/:boardId/columns/:columnId/tasks/:id
 * Purpose: Delete specified task
 */
app.delete("/boards/:boardId/columns/:columnId/tasks/:id", (req, res) => {

    Task.findByIdAndRemove({
        _id: req.params.id,
        _columnId: req.params.columnId
    }).then((removedDoc) => {
        res.send(removedDoc);
    });
});