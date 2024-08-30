const fs = require("fs");
const { parse } = require("csv-parse");

var gitlab = require ("./gitlab")

var gitlabObj = new gitlab()
async = require('async')


function CSVReader() {
  
}

CSVReader.prototype.readCSVFile = function (filename) {

fs.createReadStream("./userFiles/"+filename)

  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {


    var userName = row[0]
    var password = row[1]
    var groupList = [12,14,7,10]
   
    console.log("username ",userName.toLowerCase())
    console.log("password ",password)
    gitlabObj.addUser(userName.toLowerCase(),password,function(data,err){

        if (err){
            //console.error("Error Gitlab ",err)
            console.log("error ",userName)
            return
        }
        console.log("Gitlab User ok ",data)
        console.log("Gitlab User  ",data.data["id"])
        var userId = data.data["id"]

        async.each(groupList, function (groupId,callbackEach) {
            console.log("group to add ", groupId)
            
            gitlabObj.addUserToGroup(userId,groupId,function(){
                console.log("User Added to group OK -- ",groupId)
                callbackEach()
            })
              
          }
           ,function (res,err) {
             console.log('All done each');
             
             return
           }
          
      )
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
