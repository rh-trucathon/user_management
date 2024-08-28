function Wrapper() {
    // always initialize all instance properties


  }
  // class methods
  Wrapper.prototype.serverResponse = function(data,err,res) {

    if (err == null){
      return (res.status(200).json(data))
    }
    else{
      console.error("error",err)

      return (res.status(500).json(err));
    }


  };

  // export the class
  module.exports = Wrapper;