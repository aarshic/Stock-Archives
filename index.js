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

// console.log(result[].symbol);




// var obj = JSON.parse(data);
// for (var i = 0; i < obj.length; i++){
//     console.log(obj[i].symbol);
// }
var idsym = "";
var company = readline.question("What is your company name: ");
var year = readline.question("Year: ");
var month = readline.question("Month: ");
var day = readline.question("Day: ");
var date = year + "-" + month + "-" + day;
for (var i = 0; i < obj.length; i++){
    if (obj[i].symbol.toLowerCase() == company.toLowerCase()){
        idsym = obj[i].volume;
        if(obj[i].date == date){
            // console.log(idsym);
            // console.log(obj[i].date);
            // console.log(date);
            console.log(obj[i])
        }
    }
}

// var gender = readline.question("Gender: ");
// var age = readline.question("Age: ");

// request.get('https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=['+idsym+']&gender='+gender+'&year_of_birth='+age+'&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFhcnNoaS4xOTk4QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMzk3OSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxOC0xMC0wOSIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTM5Nzk0Nzk2LCJuYmYiOjE1Mzk3ODc1OTZ9.7qN-X98CP2HRfp0Ao-6CoDrOrMVFD9cixIWQee3QAbk&format=json&language=en-gb'
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