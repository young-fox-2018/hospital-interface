const fs = require('fs')
class Employee {
  constructor(name, position, username, password, id) {
    this.name = name
    this.position = position
    this.username = username
    this.isLogin = false
    this.password = password
  }
  static readFile(cb) {
    fs.readFile('./DB/Employee.json', 'utf8', function (err, data) {
      if (err) {
        cb()
      } else {
        cb(null, JSON.parse(data))
      }
    })
  }

  static writeFile(data) {
    fs.writeFile('./DB/Employee.json', JSON.stringify(data))
  }

  static registerEmployee(name, password, role, cb) {
    this.readFile(function (err, data) {
      let check = false
      if (err) {
        cb(err)
      } else {
        if (data.length == 0) {
          let dataResult = new Employee(name, role, name, password)
          let result = dataResult
          data.push(result)
          console.log(`save data success ${JSON.stringify(data[data.length - 1])}`)
          Employee.writeFile(data)

        } else {
          for (let i = 0; i < data.length; i++) {
            if (data[i].username == name) {
              console.clear()
              console.log("USERNAME UDAH ADA");
            }
          }
          if (check == false) {
            console.clear()
            let dataResult = new Employee(name, role, name, password)
            console.log(`save data success ${JSON.stringify(data[data.length-1])}`)
            let result = dataResult
            data.push(result)
            Employee.writeFile(data)

          }
        }
      }
    })
  }
  static loginEmployee(username, password, cb) {
    this.readFile(function (err, data) {
      let loginCheck = false
      let counter = 0
      let check = false

      if (err) {
        console.log("DATA ERROR");
      } else {

        data.forEach(element => {
          if (element.isLogin == true) {
            loginCheck = true
          }
        });

        if (loginCheck == true) {
          cb(err, "Ada yang login, kamu gak bisa login")
        } else {
          data.forEach(element => {
            if (element.username == username && element.password == password) {
              data[counter].isLogin = true
              cb(err, `user ${data[counter].name} logged in succesfully`)
              check = true
              Employee.writeFile(data)
            }
            counter++
          });
          if (check == false) {
            cb(err, "Tidak berhasil login")
          }
        }
      }
    })
  }

  static addPatient(id, name, gejala, cb) {
    let LOGIN_CODE = 1
    this.readFile(function (err, data) {
      if (err) {
        cb(err)
      } else {

        //KALO ADA YANG LOGIN
        data.forEach(element => {
          if (element.isLogin == true) {
            LOGIN_CODE = 0
          }
        });

        if (LOGIN_CODE == 1) {
          cb(LOGIN_CODE, null)
        } else {
          cb(LOGIN_CODE, null)
        }

      }
    })
  }
  static logoutEmployee(id, cb) {
    this.readFile(function (err, data) {
      if (err) {
        cb(err)
      } else {
        let result = data
        for (let i = 0; i < result.length; i++) {
          if (result[i].isLogin == true) {
            result[i].isLogin = false
          }
        }
        cb("Logout berhasil")
        Employee.writeFile(result)
      }
    })
  }
}

module.exports = Employee