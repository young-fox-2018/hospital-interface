const fs = require('fs')
class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
  static readFile(cb) {
    
    fs.readFile('./DB/Patient.json', 'utf8', function (err, data) {
      
      if (err) {
        cb()
      } else {
        cb(null, JSON.parse(data))
      }
    })
  }

  static writeFile(data) {
    fs.writeFile('./DB/Patient.json', JSON.stringify(data))
  }

  static addPatient2(id, name, gejala, cb) {
    this.readFile(function (err, data) {
      if (err) {
        cb(err)
      } else {
        let dataResult = new Patient(data.length, name, gejala)
        let result = dataResult
        data.push(result)
        console.log(`save data success ${JSON.stringify(data[data.length - 1])}`)
        Patient.writeFile(data)
      }
    })

  }
}

module.exports = Patient