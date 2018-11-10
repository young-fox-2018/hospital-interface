
const fs = require("fs");
const View = require("../Views/view");
const employee = require("./Employee")

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readFile(callback) {
    fs.readFile("./patients.json", "utf8", function(err, data){
      if(err) {
        callback(err, null)
      } else {
        callback(null, JSON.parse(data))
      }
    })
  }

  static writeFile(data, callback) {
    fs.writeFile("./patients.json", JSON.stringify(data), function(err, data){
      if(err) {
        callback(err, null)
      } else {
        callback(null, data)
      }
    })
  }

  static addPatients(id, name, diagnosis, callback) {
    Patient.readFile(function(err, data){
      if(err) {
        callback(err)
      } else {
        data.push(patient)
      }
      Patient.writeFile(data, function(err){
        if(err) {
          callback(err)
        } else {
          let checkPosition = false;
          for(let i = 0; i < data.length; i++) {
            if(data[i].position === "dokter" && data[i].login === true) {
              checkPosition = true;
              Patient.readFile("./patients.json", function(err, data){
                if(err) {
                  callback(err)
                } else {
                  let patient = new Patient(id, name, diagnosis);
                  data.push(patient);
                }
              })
            }
          }
        }
      })
    })
  }
}

module.exports = Patient
