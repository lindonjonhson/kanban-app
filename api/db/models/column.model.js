const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _boardId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Column = mongoose.model('Column', ColumnSchema);

module.exports = { Column };