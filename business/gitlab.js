
require('dotenv').config();
var axios = require('axios');

const gitlabEndpoint= process.env.GITLAB_ENDPOINT
const bearerToken = process.env.GITLAB_PAT



function Gitlab() {
  
  }
  Gitlab.prototype.addUser = function (userCSV,passwordCSV,callback) {


    const data = {
        admin:false,
        email:userCSV+"@opentlc.com",
        skip_confirmation:true,
        username:userCSV,
        password:passwordCSV,
        name:userCSV 
      };
      
      const options = {
          method: 'POST',
          url: gitlabEndpoint+'/api/v4/users',
          headers: { "PRIVATE-TOKEN": `${bearerToken}` ,
          'content-type': 'application/x-www-form-urlencoded'},
          params : data
        
        };

    console.log(" DATA to OPTIONS ", options)

    
        axios.request(options).then(function (res) {
            //console.log(JSON.stringify(res.config))  
            console.log("Gitlab User Added")
           callback(res,null)
      }).catch(function (error) {
        console.error(error.response.data);
        callback(null,error.response.data)
        return
                       
  }
)

  }
  
  Gitlab.prototype.addUserToGroup = function (userId,groupId,callback) {


    const data = {
        user_id:userId,
        access_level:50
      };
      
      const options = {
          method: 'POST',
          url: gitlabEndpoint+'/api/v4/groups/'+groupId+'/members',
          headers: { "PRIVATE-TOKEN": `${bearerToken}` ,
          'content-type': 'application/x-www-form-urlencoded'},
          params : data
        
        };

    console.log(" DATA to group ", options)

    
        axios.request(options).then(function (res) {
            //console.log(JSON.stringify(res.config))  
            console.log("Gitlab group ",groupId,"Added to user ",userId)
           callback(res,null)
      }).catch(function (error) {
        console.error(error.response.data);
        callback(null,error.response.data)
        return
                       
  }
)

  }
  
 

module.exports = Gitlab;

