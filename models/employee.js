const FileSystem = require('./fileSystem')

class Employee {
  constructor(username, password, role) {
    this._id = 0
    this._username = username
    this._password = password
    this._role = role
    this._isLogin = false
  }

  get id() {
    return this._id
  }

  set id(input) {
    this.id = input
  }

  get username() {
    return this._username
  }

  set username(input) {
    this._username = input
  }

  get password() {
    return this._password
  }

  set password(input) {
    this._password = input
  }

  get role() {
    return this._role
  }

  set role(input) {
    this._role = input
  }

  get isLogin() {
    return this._isLogin
  }

  set isLogin(input) {
    this._isLogin = input
  }

  static register(username, password, role, callback) {
    FileSystem.readData('./employees.json', function (err, data) {
      if (err) callback(err, null)
      else {
        let newEmployee = new Employee(username, password, role)
        if (data.length == 0) {
          newEmployee._id = 1
          data.push(newEmployee)
        }
        else {
          newEmployee._id = data[data.length - 1]._id + 1
          data.push(newEmployee)
        }
        FileSystem.writeData('./employees.json', data, function (err) {
          if (err) callback(err)
          else callback(null, data)
        })
      }
    })
  }

  static findAll(callback) {
    FileSystem.readData('./employees.json', function (err, data) {
      if (err) callback(err, null)
      else {
        let check = false
        data.forEach(element => {
          if (element._isLogin == true && (element._role == 'admin' || element._role == 'dokter')) {
            callback(null, data)
            check = true
          }
        })
        if (!check) {
          callback('Please login first!')
        }
      }
    })
  }

  static updateEmployee(key, newValue, callback) {
    FileSystem.readData('./employees.json', function (err, data) {
      if (err) callback(err, null)
      else {
        let check = false
        data.forEach(element => {
          if (element._isLogin == true) {
            element[`_${key}`] = newValue
            check = true
          }
        })
        if (check == false) {
          callback('Please login first!')
        }
        else {
          FileSystem.writeData('./employees.json', data, function (err) {
            if (err) callback(err)
            else callback(null)
          })
        }
      }
    })
  }

  static deleteEmployee(callback) {
    FileSystem.readData('./employees.json', function (err, data) {
      if (err) callback(err, null)
      else {
        let check = false
        for (let i = 0; i < data.length; i++) {
          if (data[i]._isLogin == true) {
            data.splice(i, 1)
            check = true
          }
        }
        if (check == false) {
          callback('You are not logged in')
        }
        else {
          FileSystem.writeData('./employees.json', data, function (err) {
            if (err) callback(err)
            else callback(null)
          })
        }
      }
    })
  }

  static employeeLogin(username, password, callback) {
    FileSystem.readData('./employees.json', function (err, data) {
      if (err) callback(err, null)
      else {
        let check = false
        data.forEach(element => {
          element._isLogin = false
          if (element._username == username && element._password == password) {
            element._isLogin = true
            check = true
          }
        })
        if (check == false) {
          callback('Wrong password or username')
        }
        else {
          FileSystem.writeData('./employees.json', data, function (err) {
            if (err) callback(err)
            else callback(null)
          })
        }
      }
    })
  }

  static employeeLogout(callback) {
    FileSystem.readData('./employees.json', function (err, data) {
      if (err) callback(err, null)
      else {
        let check = false
        data.forEach(element => {
          if (element._isLogin == true) {
            element._isLogin = false
            check = true
          }
        })
        if (check == false) {
          callback('You are not logged in')
        }
        else {
          FileSystem.writeData('./employees.json', data, function (err) {
            if (err) callback(err)
            else callback(null)
          })
        }
      }
    })
  }
}

module.exports = Employee
