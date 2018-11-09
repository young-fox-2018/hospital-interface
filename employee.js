const Model = require('./model.js')
const pathEmploy = './employee.json'

class Employee {
  constructor( username, password, position) {
    this.username = username
    this.password = password
    this.role = position
    this.login = false
  }

  static register(info, cb) {
    let username = info[0]
    let pass = info[1]
    let role = info[2]

    Model.getData(pathEmploy, function(err,data){
      if(err){
        cb(err)
      } else {
        let newEmploy = new Employee(username, pass, role)
        data.push(newEmploy)
        Model.saveData(pathEmploy,data, function(err){
          if(err) {
            cb(err)
          } else {
            cb(null,data)
        }
      })
     }

    })
  }

  static login(info,cb) {
    let username = info[0]
    let pass = info[1]

    Model.getData(pathEmploy, function(err , data) {
      if(err){
        cb(err)
      } else {
        let loginTotal = 0 
        let index = 0
        for (let i = 0; i < data.length; i++) {
          if(data[i].login == true){
            loginTotal++
          }
        }

        for (let j = 0; j < data.length; j++) {
          if (data[j].username === username && data[j].password === pass && loginTotal === 0){
            data[j].login = true
            index = j  
          }
        }
        // logintotal 0 dan password dan username sama dan 
        if (loginTotal !== 0 ) {
          cb('Sudah ada yang login!')
        } else if(data[index].username !== username || data[index].password !== pass ){
          cb('Password / username salah!')
        } else {
          Model.saveData(pathEmploy , data , function(err) {
            if(err) {
              cb(err)
            } else {
              cb(null , data[index])
            }
          })
        }
       
      
      }
    })
  }

  static logout(info,cb){
    let username = info[0]
    let pass = info[1]

    Model.getData(pathEmploy, function(err , data) {
      if(err){
        cb(err)
      } else {
        let loginTotal = 0 
        let index = 0
        for (let i = 0; i < data.length; i++) {
          if(data[i].login == true){
            loginTotal++
          }
        }

        for (let j = 0; j < data.length; j++) {
          if (data[j].username === username && data[j].password === pass && loginTotal === 0){
            data[j].login = true
            index = j  
          }
        }
        // logintotal 0 dan password dan username sama dan 
        if (loginTotal !== 0 ) {
          cb('Sudah ada yang login!')
        } else if(data[index].username !== username || data[index].password !== pass ){
          cb('Password / username salah!')
        } else {
          Model.saveData(pathEmploy , data , function(err) {
            if(err) {
              cb(err)
            } else {
              cb(null , data[index])
            }
          })
        }
       
      
      }
    })
  }

}

module.exports = Employee
