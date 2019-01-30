const express=require("express");
const request=require("request");
const mongoose=require("mongoose");
const bodyParser=require('body-parser');

const app=express();

mongoose.connect("mongodb://aarshic:qwerty0@ds217125.mlab.com:17125/archives", {
    useNewUrlParser: true
  }).then(() => {
    console.log("Successfully connected to the database");    
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.json());

const PORT= 5000;

app.listen(PORT,()=>{console.log("Server started successfully")});