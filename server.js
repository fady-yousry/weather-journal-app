// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require ("express");
// Start up an instance of app
const app =express();


//require bodyParser
const bodyParser=require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());




// Initialize the main project folder
app.use(express.static('website'));
app.use(express.json());


// Setup Server
const port=8080;
const server =app.listen(port,()=>{console.log(`running on local host : ${port}`)});


//get path
app.get('/getData', function(req,res){
    res.send(projectData);
})

//post path
app.post('/postData',function(req,res){
    console.log(req.body)
    projectData={
        date:req.body.date,
        temp:req.body.temp,
        feelings:req.body.feelings
    }
})