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

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
