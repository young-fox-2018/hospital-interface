const fs = require('fs')
const dataPath = './Data/employee.json'
const Patient = require('./PatientModel.js')

class Employee {
  constructor(name, username, password, position) {
    this.name = name
    this.username = username
    this.position = position
    this.password = password
    this.login = false
  }

  static readFile(dataPath,cb){
    fs.readFile(dataPath, function(err, data) {
      if (err) {
        cb(err)
      }
      else {
        cb(null, data)
      }
    })
  }

  static writeFile(dataPath, data, cb) {
    fs.writeFile(dataPath, data, function(err, data) {
      if (err) {
        cb(err)
      }
      else {
        cb(null, data)
      }
    })
  }

  static register(name, username, password, position, cb) {
    Employee.readFile(dataPath, function(err, data) {
      if (err) {
        cb(err)
      }
      else {
        let addNewData = new Employee(name, username, password, position)
        let newData = JSON.parse(data)
        newData.push(addNewData)
        Employee.writeFile(dataPath, JSON.stringify(newData), function(err, data) {
          if (err) {
            cb(err)
          }
          else {
            cb(null, newData)
          }
        })
      }
    })
  }

  static login(username, password, cb){
    Employee.readFile(dataPath, function(err, data) {
      if (err) {
        cb(err)
      }
      else {
        let newData = JSON.parse(data)
        let loginAut = false
        newData.forEach(function(element){
          if (element.login === false) {
            loginAut = true
            let loginCheck = false
            for (var i = 0; i < newData.length; i++) {
              if (newData[i].username === username && newData[i].password === password) {
                loginCheck = true
                newData[i].login = true
                cb(null,newData[i])
              }
            }
            Employee.writeFile(dataPath, JSON.stringify(newData), function(err, data) {
              if (err) {
                cb(err)
              }
            })
            if (loginCheck === false) {
              cb(null, `username / password wrong`)
            }
          }
          else {
            cb(null, "Gagal")
          }
        })
      }
    })
  }

  static addPatient(patient_id, patient_name, patient_diagnosis, cb) {
    Employee.readFile(dataPath, function(err, data) {
      if (err) {
        cb(err)
      }
      else {
        let newData = JSON.parse(data)
        let check = false
        let dataPatientPath = './Data/patient.json'
        for (var i = 0; i < newData.length; i++) {
          if (newData[i].login === true && newData[i].position === "dokter") {
            check = true
            Patient.readFile(dataPatientPath, function(err, data) {
              if (err) {
                cb(err)
              }
              else {
                let dataPatient = JSON.parse(data)
                dataPatient.push(new Patient(patient_id, patient_name, patient_diagnosis))
                Patient.writeFile(dataPatientPath, JSON.stringify(dataPatient), function(err, data) {
                  if (err) {
                    cb(err)
                  }
                  else {
                    cb(null, dataPatient)
                  }
                })
              }
            })
          }
        }
      }
    })
  }
}

module.exports = Employee
