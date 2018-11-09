"use strict"
const fs = require('fs')
const file = './employee.json'

class Employee {
  constructor(username, password, role) {
    this.username = username
    this.password = password
    this.role = role
  }

  static readFile(file, cb) {
    fs.readFile(file, 'utf8', function (err, result) {
      if (err) {
        cb(err)
      } else {

        cb(null, JSON.parse(result))
      }
    })
  }

  static update(file,employee, field, value, cb) {
    Employee.readFile(file, (err, data) => {
      if (err) {
        cb(err)
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i].username === employee.username) {
              data[i][field] = value
              break
          }          
        }

        Employee.writeFile(file , JSON.stringify(data , null , 2), err => {
          if (err) {
            cb(err)
          } else {
            cb(null)
          }
        })    
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
 
  static findOne(file, user, field, value, cb) {
    if (user != null) {
      Employee.readFile(file, (err, result) => {
        if (err) {
            cb(err)
        } else {
          for (let i = 0; i < result.length; i++) {
            if (result[i] != user  && result[i]['loggedIn']) {
              cb('Login is only for one person')
              break
            } else if (result[i][field] == user[field]) {
                cb(null, result[i])
            }
          }
        }
      })
    } else {
      Employee.readFile(file, (err, result) => {
        if (err) {
          cb(err)
        } else {
          let temp = null

          for (let i = 0; i < result.length; i++) {
            if (result[i][field] === value) {
              cb(null, result[i])
              temp = result[i]
              break
            } 
          }

          if (temp == null) {
            cb(null, null)
          }
        }
      })
    }
  }

  static login(user, cb) {
      Employee.findOne(file, user, 'username', null, (err, result) => {
        if (err) {
          cb(err)
        } else {
          if (user.password === result.password) {
            Employee.update(file, result, 'loggedIn', true, err => {
              if (err) {
                cb(err)
              } else {
                cb(null, result)
              }  
            })
          } else {
            cb('username / password wrong')
          }
        }
      })
  }

  static registerEmployeetoDb(user, cb) {
    const employee = new Employee(user.username, user.password, user.role)

    Employee.readFile(file, (err, result) => {
      if (err) {
        cb(err)
      } else {
        Employee.findOne(file, null, 'username',user.username, (err, data) => {
            if (err) {
              cb (err)
            } else {
                if (data != null) {
                  cb('User with that username already exist')
                } else {
                  result.push(employee)
                  Employee.writeFile(file, JSON.stringify(result, null, 2), (err) => {
                    if (err) {
                      cb(err)
                    } else {
                      Employee.readFile(file, (err, result) => {
                        if (err) {
                          cb(err)
                        } else {
                          cb(null, result)
                        }
                      })
                    }
                  })
                }
              }
          })

        }
      })
    }
}

module.exports = Employee