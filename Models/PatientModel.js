const fs = require('fs')
const dataPath = './Data/patient.json'

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readFile(dataPath, cb) {
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
}

module.exports = Patient
