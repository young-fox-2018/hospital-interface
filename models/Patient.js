const fs = require('fs')
const Employee = require('./Employee')

class Patient {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = diagnosis
    }

    static readData (file, callback) {
      fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
          callback(err)
        } else {
          callback(null, JSON.parse(data))
        }
      })
    }

    static writeData (file, data, callback) {
      fs.writeFile(file, JSON.stringify(data, null, 2), function (err) {
        if (err) {
          callback(err)
        } else {
          callback(null)
        }
      })
    } 

    static addPatient(param, callback) {
      
      Employee.checkHasLogin(function (err, data) {
        if (err) {
          callback({
            message: 'error read data employee pada saat add patient',
            err: err
          })
        } else {

          if (data.position === undefined) {
            callback({
              message: 'harap login sebagai dokter terlebih dahulu sebelum add patient'
            })
          } else if (data.position !== 'dokter') {
            callback({
              message: 'tidak memiliki akses untuk add patient'
            })
          } else if (data.position === 'dokter') {
            Patient.readData('./models/patient.json', function (err, data) {
              if (err) {
                callback({
                  message: 'error read data pada saat add patient',
                  err: err
                })
              } else {
                let id = 0
                if (data.length === 0) {
                  id = 1
                } else {
                  id = data[data.length-1].id + 1
                }
              
                let objPatient = {
                  id: id,
                  name: param[0],
                  diagnosis: param.slice(1)
                }

                let newPatient = new Patient(objPatient.id, objPatient.name, objPatient.diagnosis)
                data.push(newPatient)

                Patient.writeData('./models/patient.json', data, function (err) {
                  if (err) {
                    callback({
                      message: 'error write data pada add patient',
                      err: err
                    })
                  } else {
                    callback(null, data)
                  }
                })

              }
            })
          }

        }
      }) 
      

      
    }
}

module.exports = Patient  