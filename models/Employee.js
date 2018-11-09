const fs = require('fs')

class Employee {
    constructor(id, username, password, position) {
      this.id = id
      this.username = username
      this.password = password
      this.position = position
      this.isLogin = false
    }

    static readDataEmp (file, callback) {
      fs.readFile(file, 'utf8', function(err, data) {
        if(err) {
          callback(err)
        } else {
          callback(null, JSON.parse(data))
        }
      })
    }

    static writeDataEmp (file, data, callback) {
      fs.writeFile(file, data, function(err){
        if (err) {
          callback(err)
        } else  {
          callback(null)
        }
      })
    }

    static checkUsername (data, newEmp) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].username === newEmp.username) {
          return false
        }
      }

      return true
    }

    static checkUsernamePassword (data, empLogin){

      for (let i = 0; i < data.length; i++) {
        if (data[i].username == empLogin.username && data[i].password == empLogin.password) {
          return true
        }
      }
      return false
    }

    static registerEmp(param, callback) {
      let obj = {
        username: param[0],
        password: param[1],
        position: param[2]
      }
      
      Employee.readDataEmp('./models/employee.json', function (err, data) {
        if(err){
          callback({
            message: 'error read data employee.json saat register',
            err: err
          })
        } else {
          let id = 0
    
          if (data.length === 0) {
            id = 1
          } else {
            id = data[data.length-1].id + 1
          }

          let newEmp = new Employee(id, obj.username, obj.password, obj.position)

          if (Employee.checkUsername(data, newEmp)) {
            data.push(newEmp)
            Employee.writeDataEmp('./models/employee.json', JSON.stringify(data, null, 2), function(err) {
              if (err) {
                callback({
                  message: 'error write data employee.json saat register',
                  err: err
                })
              }else {
                callback(null, data)
              }
            })
          } else {
            callback('gagal melakukan register karena username telah dipakai')
          }

          

        }
      })
    }

    static chekOtherUserLogin (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].isLogin === true) {
          return true
        }
      }
      return false
    }

    static checkHasLogin(callback) {
      
      Employee.readDataEmp('./models/employee.json', function (err, data) {
        if (err) {
          callback(err)
        } else {
          let hasLogin = {}

          for (let i = 0; i < data.length; i++) {
            if (data[i].isLogin === true) {
              hasLogin = data[i]
            }
          }
          callback(null, hasLogin)
        }
      })
    }

    static loginEmp(param, callback) {
      let obj = {
        username: param[0],
        password: param[1]
      }
      
      Employee.readDataEmp('./models/employee.json', function (err, data) {
        if (err) {
          callback({
            message: 'terjadi error read data pada saat login',
            err : err
          })
        } else {
          if (!Employee.chekOtherUserLogin(data)) {

            if (Employee.checkUsernamePassword(data, obj)) {
              for (let i = 0; i < data.length; i++) {
                if (data[i].username === obj.username) {
                  data[i].isLogin = true
                }
              }

              Employee.writeDataEmp('./models/employee.json', JSON.stringify(data, null, 2), function(err) {
                if (err) {
                  callback({
                    message: 'terjadi error saat write data pada login',
                    err: err
                  })
                } else {
                  callback(null, obj)
                }
              })
            } else {
              callback({
                message: 'username / password is wrong'
              })
            }

          } else {
            callback({
              message: 'ada user lain yang login'
            })
          }
        }
      })
    }

    static logoutEmp (callback) {
      this.readDataEmp ('./models/employee.json', function(err, data) {
        if (err) {
          callback({
            message: 'error read data pada saat login'
          })
        } else {
          let loggedEmp = {}

          for (let i = 0; i < data.length; i++) {
            if (data[i].isLogin === true) {
              loggedEmp = data[i]
            }
          }

          if (loggedEmp.isLogin === undefined) {
            callback({
              message: 'there is no user has login'
            })
          } else {

            for (let i = 0; i < data.length; i++) {
              if (data[i].isLogin === true) {
                data[i].isLogin = false
              }
            }

            Employee.writeDataEmp('./models/employee.json', JSON.stringify(data, null, 2), function (err) {
              if (err) {
                callback({
                  message: 'error write data saat logout'
                })
              } else {
                callback(null, loggedEmp)
              }
            })
          }
        }
      })
    }    

    static findOne(param, callback) {
      let objFind = {
        field: param[0],
        value: param[1]
      }

      Employee.readDataEmp('./models/employee.json', function(err, data) {
        if (err) {
          callback({
            message: 'error read data pada findOne'
          })
        } else {
          let finded = {}

          for (let i = 0; i < data.length; i++) {
            if (data[i][objFind.field] === objFind.value) {
              finded = data[i]
            }
          }

          let index = data.findIndex((element) => {
            return element[objFind.field] === objFind.value
          }) 

          if (index !== -1) {
            callback(null, data[index])
          } else {
            callback({
              message: `user dengan ${objFind.field} ${objFind.value} tidak ditemukan`
            })
          }
        }
      })
      // console.log(objFind)
    }

}

module.exports = Employee
