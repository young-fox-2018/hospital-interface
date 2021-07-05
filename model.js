const fs = require('fs')

class Model {

  static getData(path , cb) {
    fs.readFile(path,function(err,data){
      if(err){
        cb(err)
      }else {
        cb(null, JSON.parse(data))
      }
    })
  }

  static saveData(path ,data,cb) {
    fs.writeFile(path , JSON.stringify(data, null,2), function (err){
      if(err){
        cb(err)
      }else {
        cb(null)
      }
    })
  }

 
}


module.exports = Model