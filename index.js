const express=require("express");
const request=require("request");
const mongoose=require("mongoose");
const bodyParser=require('body-parser');
const csvToJson = require('convert-csv-to-json');
const fs = require('fs');
var http = require("http");
var csvjson = require('csvjson');
var readline = require('readline-sync');

const app=express();

mongoose.connect("mongodb://aarshic:qwerty0@ds217125.mlab.com:17125/archives", {
    useNewUrlParser: true
  }).then(() => {
    console.log("Successfully connected to the database");    
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var json = csvToJson.getJsonFromCsv("../prices763fefc.csv");

var options = {
    delimiter : ',' , // optional
    quote     : '"' // optional
};

var file_data = fs.readFileSync('../prices763fefc.csv', { encoding : 'utf8'});

var obj = csvjson.toObject(file_data, options);  
request.get('http://localhost:3000', (err, res, data)=>{});

app.use(bodyParser.json());

app.use("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    // res.end(json);
});

const PORT= 3000;

app.listen(PORT,()=>{console.log("Server started successfully")});
