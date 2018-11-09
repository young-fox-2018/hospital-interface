const fs = require('fs')
const filePath = '/home/atrastudhi/Desktop/phase1/week2/friday/hospital-interface/Models/patient.json'

class Patient {

  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readFile (callback) {
    fs.readFile(filePath, 'utf8', function(err, data) {
      if(err) {
        callback(err)
      } else {
        callback(null, JSON.parse(data))
      }
    })
  }

  static writeFile (data, callback) {
    fs.writeFile(filePath, data, function(err) {
      if(err) {
        callback(err)
      } else {
        callback(null)
      }
    })
  }

  static addPatient(option, callback) {
    let diagnosis = option.slice(1)
    Patient.readFile(function(err, data) {
      if(err) {
        callback(err)
      } else {
        let newData = new Patient(data.length+1, option[0], diagnosis)
        data.push(newData)
        Patient.writeFile(JSON.stringify(data, null, 2), function(err) {
          if(err) {
            callback(err)
          } else {
            callback(null, data)
          }
        })
      }
    })
  }

}

module.exports = Patient