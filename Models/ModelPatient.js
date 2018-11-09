ModelEmployee = require("./ModelEmployee.js")

class ModelPatient {
  constructor(name, diagnosis) {
    this.id = 0
    this.name = name
    this.diagnosis = diagnosis
  }

  static addPatient(name,diagnosis,cb){
    // console.log([id,name,diagnosis])
    ModelEmployee.readFile("./employee.json",function(err,data){
        if(err){
          cb({
            message: "error read file di add Patient",
            err: err
        })
        } else {
          // let dataPatient = []
          let cekdokter = false
          for(let i = 0; i < data.length; i++){
            if(data[i].position == "dokter" && data[i].login == true){
              // dataPatient.push(new ModelPatient(name, diagnosis))
              // dataPatient[dataPatient.length - 1].id = dataPatient.length

              cekdokter = true
              
              ModelEmployee.readFile("./patient.json",function(err,data){
                if(err){
                  cb({
                    message: "error read file di add Patient",
                    err: err
                })
                } else {
                  data.push(new ModelPatient(name, diagnosis))
                  data[data.length - 1].id = data.length
                  ModelEmployee.writeFile("./patient.json",JSON.stringify(data, null, 2),function(err){
                    if(err){
                        cb({
                            message: "error write file in Add Patient",
                            err: err
                        })
                    } else {
                        cb(null,data)
                    }
                  })
                }  
              })
            }
          }

          if(!cekdokter){
            cb("Tidak memiliki akses untuk add patient!")
          }

        }
    })
  }
}

module.exports = ModelPatient