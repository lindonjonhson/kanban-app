const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Kanban', { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>{
    console.log("Connected successfully to the DB");
}).catch((e) =>{
    console.log("Error while attempting to connect to the DB :(");
    console.log(e);
});

//Prevent deprecation warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports ={
    mongoose
};