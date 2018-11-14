const fs = require('fs')
const Employee = require('/Users/admin/Documents/Phase 1/Week 2/hospital-interface/models/EmployeeModel.js')

class Patient {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = diagnosis
      this.statusHealth = 'Sick'
    }

    static readFile(callback) {
      fs.readFile('./models/patient.json', 'utf8', function(err, data) {
        if(err) {
          let obj = {message: 'error di readFile', details: err}
          callback(obj) 
        } else {
          callback(null, data)
        }
      })
    }

    static writeFile(data, callback) {
      fs.writeFile('./models/patient.json', JSON.stringify(data, null, 4), function(err) {
        if(err) {
          let obj = {message: 'error di writeFile', details: err}
          callback(obj)
        } else {
          callback(null)
        }
      })
    }

    static readFileEmployee(callback) {
      fs.readFile('./models/employee.json',function(err, data) {
        if(err) {
          let obj = {message: 'error read file employee di PatientModel.js', details: err}
          callback(obj)
        } else {
          callback(null, data)
        }
      })
    }

    static addPatient(input, callback) {
      // Employee.readFile(function(err, data) {
      Patient.readFileEmployee(function(err, data) {
          if(err) {
            let obj = {message: 'error readFile dokter'}
            callback(obj)
          } else {
            let dataDokter = JSON.parse(data)
            let isDokter = false
            for(let i = 0; i < dataDokter.length; i++) {
              if(dataDokter[i].isLogin === true) {
                isDokter = true
              }
            }
            if(isDokter) {
              Patient.readFile(function(err, data) {
                if(err) {
                  let obj = {message: 'error di readFile patient', details: err}
                } else {
                  let newData = JSON.parse(data)
                  let diagnosis = input.slice(1).join(', ')
                  let newPatient = new Patient(newData.length+1, input[0], diagnosis)
                  newData.push(newPatient)
                  
                  Patient.writeFile(newData, function(err) {
                    if(err) {
                      let obj = {message: 'error di writeFile patient', details: err}
                      callback(obj)
                    } else {
                      callback(null, newData.length)
                    }
                  })
                }
              })
            } else {
              callback('hanya dokter yang dapat add patient')
            }
          }
        })
    }

    static patientStatus (input, callback) {
      // Employee.readFile(function(err, data) {
      Patient.readFileEmployee(function(err, data) {
        if (err) {
          callback(err)
        } else {
          let dataEmployee = JSON.parse(data)
          let isDokter = false
          //mengecek apakah ada dokter yang sedang login
          for(let i = 0; i < dataEmployee.length; i++){
            if(dataEmployee[i].position === 'dokter' && dataEmployee[i].isLogin === true) {
              isDokter = true
            }
          }

          if(isDokter) {
            Patient.readFile(function(err, data) {
              if (err) {
                callback(err)
              } else {
                let name = input[0]
                let newData = JSON.parse(data)
                for(let i = 0; i < newData.length; i++) {
                  if(newData[i].name === name) {
                    newData[i].statusHealth = 'Healed'
                  }
                }
                Patient.writeFile(newData, function(err) {
                  if(err) {
                    callback(err)
                  } else {
                    callback(null)
                  }
                })
              }
            })
          } else {
            callback('hanya dokter yang bisa merubah status pasien')
          }
        }
      })
      
    }
}

module.exports = Patient