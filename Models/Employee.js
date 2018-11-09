
const fs = require("fs");
const View = require("../Views/view");

class Employee {
    constructor(name, username, position, password) {
      this.name = name
      this.username = username
      this.position = position
      this.password = password
      this.login = false
    }
  
    static readFile(callback) {
        
        fs.readFile("./employee.json", "utf8", function(err, data){
            
            data = JSON.parse(data)
            if(err) {
                callback(err,null) // invoke dari 
            } else {
                callback(null, data)
            }
        })
    }

    static findAll(callback) {

        Employee.readFile(function(err,data){
            if(err) {
                callback(err,null) // invoke dari controller 
            }else{
                callback(null,data)
            }
        })

    }
  
    static writeFile(data, callback) {
      
      data = JSON.stringify(data , null , 2) // udah jadi bentuk string 
      
      fs.writeFile("./employee.json", data, function(err){
          if(err) {
              callback(err) // invoke 
          } else {
              callback(null)
          }
      })
    }

    static register(name, username, password, position, callback) {
        let newData = new Employee(name, username, password, position);
        Employee.readFile(function(err, data){
            data.push(newData);
            Employee.writeFile(data,function(err){
                if(err) {
                    callback(err);
                } else {
                    callback(null, data);
                }
            })
        })
    }

    static login(username, password, callback) {
        Employee.readFile(function(err, data){
            data = JSON.parse(data)
            if(err){
                callback(err)
            } else {
                let loggedIn = false;
                for(let i = 0; i < data.length; i++){
                    if(data[i].username === username && data[i].password === password) {
                       data[i].login = true
                        loggedIn = true
                       callback(null, data[i])
                    }
                }

                Employee.writeFile("./employee.json", data, function(err){
                    if(err) {
                        callback(err)
                    }
                })
                if(loggedIn === false){
                    callback("wrong!")
                }
            }
        })
    }
  }

module.exports = Employee;

// Employee.login()