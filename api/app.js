const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Database connection
const { mongoose } = require('./db/mongoose');

// Load models
const { Board } = require('./db/models/board.model');


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
 * Purpose: Get board
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
