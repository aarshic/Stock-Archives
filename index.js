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
// console.log(json);

// const storeData = (json, path) => {
//     try {
//         fs.writeFileSync(path, JSON.stringify(data))
//     } 
//     catch (err) {
//         console.error(err)
//     }
// }



var options = {
    delimiter : ',' , // optional
    quote     : '"' // optional
};


var file_data = fs.readFileSync('../prices763fefc.csv', { encoding : 'utf8'});

var obj = csvjson.toObject(file_data, options);  

// console.log(obj[10000]);










// var idsym = "";
// var company = readline.question("What is your company name: ");
// var year = readline.question("Year: ");
// var month = readline.question("Month: ");
// var day = readline.question("Day: ");
// var date = year + "-" + month + "-" + day;
// for (var i = 0; i < obj.length; i++){
//     if (obj[i].symbol.toLowerCase() == company.toLowerCase()){
//         idsym = obj[i].volume;
//         if(obj[i].date == date){
//             // console.log(idsym);
//             // console.log(obj[i].date);
//             // console.log(date);
//             console.log(obj[i])
//         }
//     }
// }









// var gender = readline.question("Gender: ");
// var age = readline.question("Age: ");

// options1=window.document.getElementById("company");
// options2=document.getElementById("year");
// options3=document.getElementById("month");
// options4=document.getElementById("day");


// request.get('http://localhost:3000/?company=['+options1+']&year=['+options2+']&month=['+options3+']&day=['+options4+']'
// ,(err, res, data)=>{
//     var obj = JSON.parse(data);
//     for (var i = 0; i < obj.length; i++){
//         console.log(obj[i].Issue.Name);
//     }
    
//     var condition = readline.question("What is your condition: ");
//     console.log("Your condition is: " + condition);

//     var x = condition.toString().replace(/\s+/g, '-').toLowerCase();
//     request.get('https://www.apollohospitals.com/patient-care/health-and-lifestyle/diseases-and-conditions/' + x
//     ,(err, res, data)=>{
//         console.log(data);  
//         var ch = global.document.getElementsByClassName(".arrow");
//         console.log('treatment: ' + ch);
//     });
// });










app.use(bodyParser.json());



app.use("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    // res.end(json);
});


const PORT= 3000;

app.listen(PORT,()=>{console.log("Server started successfully")});