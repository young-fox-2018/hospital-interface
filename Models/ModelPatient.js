ModelEmployee = require("./ModelEmployee.js")

class ModelPatient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static addPatient(id,name,diagnosis,cb){
    // console.log([id,name,diagnosis])
    ModelEmployee.readFile("./employee.json",function(err,data){
        if(err){
          cb({
            message: "error read file di add Patient",
            err: err
        })
        } else {
          let dataPatient = []
          for(let i = 0; i < data.length; i++){
            if(data[i].position == "dokter" && data[i].login == true){
              dataPatient.push(new ModelPatient(id, name, diagnosis))

              ModelEmployee.writeFile("./patient.json",JSON.stringify(dataPatient, null, 2),function(err){
                if(err){
                    cb({
                        message: "error write file in Add Patient",
                        err: err
                    })
                } else {
                    cb(null,dataPatient)
                }
            })
            }
          }
        }
    })
  }
}

module.exports = ModelPatient