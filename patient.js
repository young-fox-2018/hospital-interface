const Model = require('/Users/zhang/phase1/p1w2/hospital-interface/model.js')
const pathPatient = './patient.json'
const pathEmploy = './employee.json'

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static addPatient(info, cb) {
    let id = info[0]
    let name = info[1]
    let sick = info.slice(2)

    Model.getData(pathEmploy , function(err, data){
      if(err){
        cb(err)
      } else {
        let ceklogin = false
        let cekdokter = false
        let index = 0

        for (let i = 0; i < data.length; i++) {
          if(data[i].login === true && data[i].role === 'dokter'){
            ceklogin = true
            cekdokter = true
            index = i
           
          } 
        }

        if(ceklogin === true && cekdokter === true) {
          Model.getData(pathPatient, function(err, data){
            if(err){
              cb(err)
            } else {
              let idIncrement = data.length+1
              let newPatient = new Patient(idIncrement , name , sick)
              data.push(newPatient)
              Model.saveData(pathPatient,data , function(err) {
                if(err){
                  cb(err)
                } else {
                  cb(null , data)
                }
              } )
            }
          })
        }else {
            cb('tidak memiliki akses')
          
        }
      }
    })

  }
}

module.exports = Patient