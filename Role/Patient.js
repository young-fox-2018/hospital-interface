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
        let dataResult = null
        if (data.length == 0) {
          dataResult = new Patient(1, name, gejala)
        } else {
          dataResult = new Patient(data.length+1, name, gejala)
        }
        
        let result = dataResult
        data.push(result)
        cb(`data pasien berhasil ditambahkan. Total data pasien : ${data.length}`)
        Patient.writeFile(data)
      }
    })

  }
}

module.exports = Patient