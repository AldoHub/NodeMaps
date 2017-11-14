const express = require("express");
const bodyParser= require("body-parser");
const app = express();



//get the static file server
app.use(express.static(__dirname + "/public/"));

//set the view engine to pug
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//routes
const mainRoute= require("./routes/main");

//use the routes
app.use("/", mainRoute);

//build the server
app.listen(5000, ()=>{
    //send a message to tell the server is now running
    console.log("Server is running at localhost:5000");

});





