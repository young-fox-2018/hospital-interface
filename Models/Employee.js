const fs = require("fs")
const Patient = require("./Patient")

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.loggedIn = false
  }

  static readFile(cb){
    fs.readFile('./employee.json','utf8',function(err,data){
      if(err){
        let obj = {
          Message: "Errornya di readFile employee",
          Details: err
        }
        cb(obj)
      }
      else{
        cb(null, JSON.parse(data))
      }
    })
  }

  static saveFile(data, cb){
    fs.writeFile('./employee.json', JSON.stringify(data, null, 2),function(err){
      if(err){
        let obj = {
          Message: "Errornya di saveFile employee",
          Details: err
        }
        cb(obj)
      }
      else{
        cb(null)
      }
    })
  }

  static readPatient(cb){
    fs.readFile('./patient.json','utf8',function(err,data){
      if(err){
        let obj = {
          Message: "Errornya di readFile Patient",
          Details: err
        }
        cb(obj)
      }
      else{
        cb(null, JSON.parse(data))
      }
    })
  }

  static savePatient(data, cb){
    fs.writeFile('./patient.json', JSON.stringify(data, null, 2),function(err){
      if(err){
        let obj = {
          Message: "Errornya di saveFile Patient",
          Details: err
        }
        cb(obj)
      }
      else{
        cb(null)
      }
    })
  }




  static addEmployee(input, cb){
    Employee.readFile(function(err, data){
      if(err) {
        cb(err)
      }
      else{
        let newData = data
        let newEmployee = new Employee(input[0],input[2],input[0],input[1])
        newData.push(newEmployee)
        
        Employee.saveFile(newData, function(err){

          if(err){
            cb(err)
          }
          else{
            Employee.readFile(function(err, data){

              if(err){
                let obj = {
                  Message: "Errornya di readfile addEmployee",
                  detail: err
                }
                cb(obj)
              }
              else{
                cb(null, data)
              }

            })
          }
        })
      }
    })
    
  }

  static login(input, cb){
    Employee.readFile(function(err, data){
      if(err) {
        cb(err)
      }
      else{
        let updateLogin = data
        let checkId = false
        let checkLog = false
        let dataLogged = {}
        
        for(let i in updateLogin){
          if(updateLogin[i]["loggedIn"] === true){
            checkLog = true
          }
          else if(updateLogin[i]["username"] === input[0] && updateLogin[i]["password"] === input[1]){
            updateLogin[i]["loggedIn"] = true
            checkId = true
            dataLogged = updateLogin[i]
          }
        }
        if(checkLog){
          cb(`Hanya boleh 1 orang logged in at the same time`)
        }
        else{
          if(!checkId){
            let obj = {
              Message: "password / id yang dimasukkan salah"
            }
            cb(null, obj)
          } else{
            Employee.saveFile(updateLogin,function(err){
              if (err){
                let obj = {
                  Message: "Errornya di login",
                  details: err
                }
                cb(obj)
              }
              else{
                let obj = {
                  Message: `user ${dataLogged["username"]} login berhasil`
                }
                checkLog = true
                cb(null, obj)
              }
            })
          }
        }
      }
   })
  }


  static addPatient(input, cb){
    Employee.readFile(function(err, data){
      if(err) {
        cb(err)
      }
      else{
        let isDoctor = false

        for(let i in data){
          if(data[i]["loggedIn"] === true && data[i]["position"] === "dokter"){
            isDoctor = true
          }
        }
        if(isDoctor){
          Employee.readPatient(function(err, data){
            if(err){
              cb(err)
            }
            else{
              let newData = data
              let diagnosis = input.slice(2)
              let newPatient= new Patient(newData.length+1,input[1],diagnosis)
              newData.push(newPatient)
    
              Employee.savePatient(newData, function(err){
                if(err){
                  cb(err)
                }
                else{
                  cb(null, data)
                }
              })    
            }
          })
        }
        else{
          cb(`Access is available only to doctors!`)
        }
      }
    })
  }

  static logout(cb){
    Employee.readFile(function(err, data){
      if(err){
        cb(err)
      }
      else{
        let checkData = data

        for(let i in checkData){
          if(checkData[i]["loggedIn"] === true){
            checkData[i]["loggedIn"] = false
          }
        }
        Employee.saveFile(checkData,function(err){
          if (err){
            let obj = {
              Message: "Errornya di logout",
              details: err
            }
            cb(obj)
          }
          else{
            let obj = {
              Message: `user logout berhasil`
            }
            cb(null,obj)
          }
        })
      }
    })
  }

}

module.exports = Employee