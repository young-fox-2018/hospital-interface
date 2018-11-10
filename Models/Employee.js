
const fs = require("fs");

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.username = username
    this.position = position
    this.password = password
    this.login = false
  }

  static readFile(callback) {
    fs.readFile("./employee.json", "utf8", function(err, data){
      if(err){
        callback(err, null)
      } else {
        callback(null, JSON.parse(data))
      }
    })
  }

  static writeFile(data, callback) {
    fs.writeFile("./employee.json", JSON.stringify(data, null, 2), function(err){
      if(err){
        callback(err)
      } else {
        callback(null)
      }
    })
  }

  static register(name, position, username, password, callback) {
    Employee.readFile(function(err, data){
      if(err){
        callback(err)
      } else {
        let newData = new Employee(name, position, username, password)
        data.push(newData);
        Employee.writeFile(data, function(err){
          if(err) {
            callback(err)
          } else {
            callback(null, data)
          }
        })
      }
    })
  }

  static findAll(callback){
    Employee.readFile(function(err, data){
      if(err) {
        callback(err, null)
      } else {
        callback(null, data)
      }
    })
  }

  static login(username, password, callback) {
    Employee.readFile(function(err, data){
      if(err){
        callback(err)
      } else {
        let checkLogin = false
        for(let i = 0; i < data[i].length; i++) {
          if(data[i].username === username && data[i].password === password) {
            data[i].login = true;
            checkLogin = true
          }
          callback(null, data[i])
        }
        Employee.writeFile(data, function(err){
          if(err){
            callback(err)
          }
        })
        if(checkLogin === false) {
          callback("wrong username/password")
        }
      }
    })
  }
}

// Employee.login()
module.exports = Employee
