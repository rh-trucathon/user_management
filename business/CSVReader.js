const fs = require("fs");
const { parse } = require("csv-parse");

var gitlab = require ("./gitlab")

var gitlabObj = new gitlab()



function CSVReader() {
  
}

CSVReader.prototype.readCSVFile = function (filename) {

fs.createReadStream("./userFiles/"+filename)

  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {


    var userName = row[0]
    var password = row[1]
    console.log("username ",userName)
    console.log("password ",password)
    gitlabObj.addUser(userName,password,function(data,err){

        if (err){
            console.error("Error Gitlab ",err)
            return
        }
        console.log("Gitlab ok ",data)

        return
    })


  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
}

module.exports = CSVReader;
