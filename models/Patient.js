"use stirct"

const patienFile = '/Users/hacktiv8/Desktop/robert/robert/hospital-interface/patient.json'
const fs = require('fs')

class Patient {
    constructor(name, diagnosis) {
      this.id = 0
      this.name = name
      this.diagnosis = diagnosis
    }

    static readFile(file, cb) {
      fs.readFile(file, 'utf8', (err, result) => {
        if (err) {
          cb(err)
        } else {
          cb(null, JSON.parse(result))
        }
      })
    }

    static writeFile(file, data, cb) {
      fs.writeFile(file, data , err => {
        if (err) {
          cb(err)
        } else {
          cb(null)
        }
      })
    }

    static addData(user, patient, cb) {
      if (user.role != 'dokter') {
        cb('User tidak memiliki akses')
      } else {
        Patient.readFile(patienFile, (err, data) => {
          if (err) {
            cb(err)
          } else {
            const newData = new Patient(patient.name, patient.diagnosis)

            if (data.length == 0) {
              newData.id = 1
            } else {
              newData.id = data.length + 1
            }

            data.push(newData)

            Patient.writeFile(patienFile, JSON.stringify(data, null , 2), err => {
              if (err) {
                cb(err)
              } else {
                Patient.readFile(patienFile, (err, data) => {
                  if (err) {
                    cb(err)
                  } else {
                    cb(null, data)
                  }
                })
              }
            })
          }  
        })
      }
    }
  }

module.exports = Patient
  