

const hostname = '127.0.0.1';
const port = 3000;
require('dotenv').config()

var express = require('express');
var app = express();
var http = require('http');
var morgan = require('morgan')
var debug = require('debug')
var cors = require('cors')


var csvReader = require('./business/CSVReader.js')
var gitlab = require('./business/gitlab.js')

var gitlabObj = new gitlab()
var csvReaderObj = new csvReader()

var bodyParser = require('body-parser');

var env = process.env.NODE_ENV || 'development'






csvReaderObj.readCSVFile(process.env.CSV_FILE_NAME)

/*
var userArray = []

for (let i = 28; i < 45; i++) {
    userArray.push(i)
  }

gitlabObj.deleteUserArray(userArray,function(res){
    console.log ("done")
})
console.log(" array user ",userArray)



*/

// ...





module.exports = app;


