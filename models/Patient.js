const fs = require('fs')
const Employee = require('./Employee')

class Patient {
    constructor(obj) {
      this.id = obj.id
      this.name = obj.name
      this.diagnosis = obj.diagnosis
    }

    static readData(file, cb) {
      fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
          cb(err);
        } else {
          cb(null, JSON.parse(data));
        }
      })
    }
  
    static writeData(file, data, cb) {
      fs.writeFile(file, JSON.stringify(data, null, 2), function(err) {
        if (err) {
          cb(err);
        } else {
          cb(null)
        }
      })
    }

    static addPatient(id, name, diagnosis, cb) {
      Employee.readData('./employee.json', function(err, data) {
        if (err) {
          cb({message: 'read data err', err: err})
        } else {
          let cekDoc = false
          data.forEach(element => {
            if (element.loggedIn === true) {
              if (element.position === 'dokter') {
                cekDoc = true;
              }
            }
          });
          if (cekDoc === false) {
            cb('tidak memilki akses untuk add patient')
          } else {
            Patient.readData('./patient.json', function(err, data) {
              if (err) {
                cb({message: 'read data err', err: err})
              } else {
                let obj = {
                  id: id,
                  name: name,
                  diagnosis: diagnosis
                }
                let newData = data;
                newData.push(new Patient(obj));
                Patient.writeData('./patient.json', newData, function(err) {
                  if (err) {
                    cb({message: 'write data err', err: err})
                  } else {
                    cb(null, obj, newData.length)
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