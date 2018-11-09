const fs = require('fs')
const filePath = './Models/employee.json'
const Patient = require('./Patient')

class Employee {

  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.login = false
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

  static registerEmployee (option, callback) {
    Employee.readFile(function (err, data) {
      if(err) {
        callback(err)
      } else {
        let newData = new Employee(option[0], option[2], option[0], option[1])
        
        for(let i = 0; i < data.length; i++) {
          if(data[i].username === newData.username) {
            callback(`Username telah dipakai`)
          } else {
            data.push(newData)

            Employee.writeFile(JSON.stringify(data, null, 2), function(err) {
              if(err) {
                callback(err)
              } else {
                callback(null, data, JSON.stringify(newData))
              }
            })
          }
        }
      }
    })
  }

  static checkLogin (data, info) {
    let check = true
    data.forEach(element => {
      if(element.login === true) {
        check = false
      }
    });
    return check
  }

  static login (option, callback) {
    Employee.readFile(function(err, data) {
      if(err) {
        callback(err)
      } else {
        let check = false
        data.forEach(element => {
          if(element.username === option[0] && element.password === option[1]) {
            if(Employee.checkLogin(data) === true) {
              check = true
              element.login = true
              Employee.writeFile(JSON.stringify(data, null, 2), function(err) {
                if(err) {
                  callback(err)
                } else {
                  callback(null, element.username)
                }
              })
            } else {
              check = true
              callback('cant login more then 1 person')
            }
          } 
        });
        if(check === false) {
          callback('username / password wrong')
        }
      }
    })
  }

  static addPatient (option, find, callback) {
    Employee.findOne(find, function(err, data) {
      if(err) {
        callback(err)
      } else {
        if(data.position === 'dokter') {
          Patient.addPatient(option, function(err, data) {
            if(err) {
              callback(err)
            } else {
              callback(null, data)
            }
          })
        } else {
          callback(`tidak memiliki akses untuk add patient`)
        }
      }
    })
  }

  static findOne(options, callback) {
    Employee.readFile(function(err, data) {
      if(err) {
        callback(err)
      } else {
        for(let i = 0; i < data.length; i++) {
          if(data[i][options.field] === options.value) {
            callback(null, data[i])
          }
        }
      }
    })
  }

  static logout (option, callback) {
    Employee.readFile(function(err, data) {
      if(err) {
        callback(err)
      } else {
        data.forEach(element => {
          if(element.name === option[0]) {
            if(element.login === true) {
              element.login = false
              Employee.writeFile(JSON.stringify(data, null, 2), function(err) {
                if(err) {
                  callback(err)
                } else {
                  callback(null, element.name)
                }
              })
            } else {
              callback(`${element.name} belum login, harap login dahulu`)
            }
          }
        });
      }
    })
  }

}

module.exports = Employee