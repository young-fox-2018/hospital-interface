const fs = require("fs")
let DBpath = "./employee.json"
let PTpath = "./patient.json"
class Model {
  static readFile(path, callback) {
    fs.readFile(path, "utf8", function (err, data) {
      if (err) callback(err)
      else callback(null, JSON.parse(data))
    })
  }

  static generateEmployee(name, position, username, password) {
    return new Employee(name, position, username, password)
  }

  static writeFile(path, data, callback) {
    fs.writeFile(path, JSON.stringify(data, null, 4), function (err, msg) {
      if (err) callback(err)
      else { callback(msg) }
    })
  }

  static login(username, password, callback) {
    Model.readFile(DBpath, function (err, data) {
      if (err) throw err
      else {
        let index = data.findIndex((element) => { return element.loginStatus === true })
        if (index !== -1 && data[index].username === username) { callback(null, `You HAVE already logged in!`) }
        else if (index !== -1) { callback(null, `>>> ${data[index].name} need to log out first!`) }
        else {
          let indexUsername = data.findIndex((element) => { return element.username === username })
          let indexPassword = data.findIndex((element) => { return element.password === password })
          if (indexUsername === -1) { callback(null, `>>> Username does not exist `) }
          else if (indexPassword === -1) { callback(null, `>>> Username / Password is wrong`) }
          else if (indexUsername === indexPassword) {
            data[indexUsername].loginStatus = true
            Model.writeFile(DBpath, data, function (err) {
              if (err) throw err
              else callback(null, `>>> ${data[indexUsername].name} has successfully logged in!`)
            })
          }
          else { callback(null, `>>> Username / password is wrong `) }
        }
      }
    })
  }

  static logout(username, callback) {
    Model.readFile(DBpath, function (err, data) {
      if (err) throw err
      else {
        let user = data.findIndex(element => { return element.username === username })
        if(user === -1){ callback(null, `>>> user does not exist`) }
        else if (data[user].loginStatus === false) { callback(null, `>>> User has not been logged in !`) }
        else {
          data[user].loginStatus = false
          Model.writeFile(DBpath, data, function (err) {
            if (err) throw err
            else callback(null, `>>> User ${data[user].name} has successfully logout`)
          })
        }
      }
    })
  }

  static register(name, position, username, password, callback) {
    Model.readFile(DBpath, function (err, data) {
      if (err) throw err
      else {
        let newEmployee = Model.generateEmployee(name, position, username, password)
        data.push(newEmployee)
        Model.writeFile(DBpath, data, function (err) {
          if (err) callback(err)
          else callback(`
{"username":"${username}","password":${password},"role":${position}}
Total data: ${data.length}            
`)
        })
      }
    })
  }

  static addPatient(name, diagnose, callback){
    Model.readFile(PTpath, function(err,data){
      if(err) throw err 
      else{ 
        let obj = {Name:name,id:data.length+1,diagnose:diagnose.join(",")}
        data.push(obj)
        Model.writeFile(PTpath, data, function(err){
          if (err) throw err
          else { callback(null,`
>>> Patient data has been successfully added!
Total patient: ${data.length}
          `) }
        })
      }
    })
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.loginStatus = false
  }
}

module.exports = {
  Model: Model,
  Patient: Patient,
  Employee: Employee
}