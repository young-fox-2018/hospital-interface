const fs = require("fs")
class Patient {
    constructor(obj) {
      this.id = obj.id
      this.name = obj.name
      this.diagnosis = obj.diagnosis
    }
    static readFile(callback){
      fs.readFile('./patient.json','utf8',function(err,data){
        if(err){
          callback(err)
        }else{
          callback(null , JSON.parse(data))
        }
      })
    }
    static writeFile(data,callback){
      fs.writeFile('./patient.json',JSON.stringify(data,null,2),'utf8',function(err){
        if(err){

          callback(err)
        }else{
          callback(null)
        }
      })

    }
    static addPantient(option,callback){

      Patient.readFile(function(err,data){
        if(err){
          callback(err)
        }else{
          let obj ={
            id:data.length+1,
            name: option[0],
            diagnosis: option.slice(1)

          }
          const patient = new Patient(obj)
          data.push(patient)
          Patient.writeFile(data,function(err){
            if(err){
              callback(err)
            }else{
              callback(null,patient,data.length)
            }
          })
        }
        
      })

    }
  }

module.exports = Patient