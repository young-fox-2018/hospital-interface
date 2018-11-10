const Employee = require('./employee')
const FileSystem = require('./fileSystem')

class Patient {
  constructor(name, diagnosis) {
    this._id = 0
    this._name = name
    this._diagnosis = diagnosis
  }

  get id() {
    return this._id
  }

  set id(input) {
    this._id = input
  }

  get name() {
    return this._name
  }

  get diagnosis() {
    return this._diagnosis
  }

  static addPatient(name, diagnose, callback) {
    Employee.findAll(function(err, data) {
      if (err) callback(err, null)
      else {
        let employeeData = data
        let check = false
        employeeData.forEach(element => {
          if (element._isLogin == true && element._role == 'dokter') {
            FileSystem.readData('./patients.json', function(err, data) {
              if (err) callback(err, null)
              else {
                let patientData = data
                let newPatient = new Patient(name, diagnose)
                if (patientData.length == 0) {
                  newPatient.id = 1
                  patientData.push(newPatient)
                }
                else {
                  newPatient.id = patientData[patientData.length - 1]._id + 1
                  patientData.push(newPatient)
                }
                FileSystem.writeData('./patients.json', patientData, function(err) {
                  if (err) callback(err)
                  else callback(null)
                })
              }
            })
            check = true
          }
        })
        if (!check) {
          callback('Please make sure you are logged in and you have access to add patient')
        }
      }
    })
  }

  static findAll(callback) {
    Employee.findAll(function (err, data) {
      if (err) callback(err, null)
      else {
        let employeeData = data
        let check = false
        employeeData.forEach(element => {
          if (element._isLogin == true && (element._role == 'admin' || element._role == 'dokter')) {
            FileSystem.readData('./patients.json', function(err, data) {
              if (err) callback(err, null)
              else {
                let patientData = data
                callback(null, patientData)
              }
            })
            check = true
          }
        })
        if (!check) {
          callback('Please login first!')
        }
      }
    })
  }

  static updatePatient(id, field, newValue, callback) {
    Employee.findAll(function(err, data) {
      if (err) callback(err, null)
      else {
        let employeeData = data
        let check = false
        employeeData.forEach(element => {
          if (element._isLogin == true && element._role == 'dokter') {
            FileSystem.readData('./patients.json', function(err, data) {
              if (err) callback(err, null)
              else {
                let patientData = data
                let check2 = false
                patientData.forEach(element => {
                  if (element._id == id) {
                    element[`_${field}`] = newValue
                    check2 = true
                  }
                })
                if(!check2) {
                  callback('Wrong patient id or field')
                }
                else {
                  FileSystem.writeData('./patients.json', patientData, function(err) {
                    if (err) callback(err)
                    else callback(null)
                  })
                }
              }
            })
            check = true
          }
        })
        if (!check) {
          callback('Please login first and make sure you have access to update patient data')
        }
      }
    })
  }

  static deletePatient(id, name, callback) {
    Employee.findAll(function(err, data) {
      if (err) callback (err, null)
      else {
        let employeeData = data
        let check = false
        employeeData.forEach(element => {
          if (element._isLogin == true && element._role == 'dokter') {
            FileSystem.readData('./patients.json', function(err, data) {
              if (err) callback(err, null)
              else {
                let patientData = data
                let check2 = false
                patientData.forEach((element, index) => {
                  if (element._id == id && element._name == name) {
                    patientData.splice(index, 1)
                    check2 = true
                  }
                })
                if (!check2) {
                  callback('Wrong patient id or name')
                }
                else {
                  FileSystem.writeData('./patients.json', patientData, function(err) {
                    if (err) callback(err)
                    else callback(null)
                  })
                }
              }
            })
            check = true
          }
        })
        if (!check) {
          callback('Please login first and make sure you have access to update patient data')
        }
      }
    })
  }
}
module.exports = Patient