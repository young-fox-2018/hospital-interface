const Patient = require("./Patient");
const Employee = require("./Employee");
const fs = require("fs");
const fileAddress = "/Users/Kevin/Documents/Hacktiv8/Phase-1/Excercise/week2/day5/hospital-interface/employee.json"
const patientsFileAddress = "/Users/Kevin/Documents/Hacktiv8/Phase-1/Excercise/week2/day5/hospital-interface/patients.json"


class Model {

  static readFile (callback){
    fs.readFile(fileAddress, "utf-8", function(err, data){
      if(err){
        callback(err);
      }
      else{
        callback(null, data)
      }
    })
  }

  static writeFile(data, callback){
    fs.writeFile(fileAddress, data, function(err){
      if(err){
        callback(err);
      }
      else{
        callback(null)
      }
    })
  }

  static register(newEmployee, callback){
    Model.readFile(function(err, data){
      if(err){
        callback(err)
      }else{
        let newData = JSON.parse(data);

        let id 
        if(newData.length === 0){
          id = 1;
        }else{
          id = newData[newData.length-1]["id"]+1
        }

        let curEmployee = new Employee(id, newEmployee.role, newEmployee.username, newEmployee.password);
        newData.push(curEmployee)

        newData = JSON.stringify(newData, null, 2)
        Model.writeFile(newData, function(err){
          if(err){
            callback(err)
          }
          else{
            callback(null)
          }
        })
      }
    })
  }

  static login(username, password,callback){
    Model.readFile(function(err, data){
      if(err){
        callback(err);
      }
      else{
        let newData = JSON.parse(data);
        let authenticated = false;

        for(let i = 0; i < newData.length; i++){
          if(newData[i].username === username && newData[i].password === password){
            authenticated = true;
            newData[i].isLoggedin = true;
          }
        }

        
        if(authenticated){
          newData = JSON.stringify(newData, null, 2)
          Model.writeFile(newData,function(err){
            if(err){
              callback(err)
            }
            else{
              callback(null)
            }
          })
        }

        else{
          callback("{Message : username / password wrong}")
        }
      }
    })
  }

  static logout(callback){
    Model.readFile(function(err, data){
      if(err){
        callback(err)
      }
      else{
        let accountList = JSON.parse(data)
        let loggedIn = false;

        for(let i = 0; i < accountList.length; i++){
          if(accountList[i].isLoggedIn == true){
            loggedIn = true;
            accountList[i].isLoggedIn = false;
          }
        }

        accountList = JSON.stringify(accountList, null, 2)

        if(loggedIn == true){
          Model.writeFile(accountList, function(err){
            if(err){
              callback(err);
            }
            else{
              callback(null);
            }
          })
        }
        else{
          callback("{Message : There is no account currently logged in}")
        }

      }
    })
  }

  static readPatientsFile(callback){
    fs.readFile(patientsFileAddress, "utf-8", function(err, data){
      if(err){
        callback(err);
      }
      else{
        callback(null, data)
      }
    })
  }

  static writePatientsFile(data, callback){
    fs.writeFile(patientsFileAddress, data, function(err){
      if(err){
        callback(err);
      }
      else{
        callback(null)
      }
    })
  }


  static checkLogin(role,callback){

    Model.readFile(function(err,data){
      if(err){
        callback(err)
      }
      else{
        let employeesData = JSON.parse(data);
        let loggedIn = false
        
        for(let i = 0 ; i < employeesData.length; i++){
          if(role == undefined){
            if(employeesData[i].isLoggedIn === true){
              loggedIn = true;
            }
          }
          else{
            if(employeesData[i].isLoggedin === true && employeesData[i].role === role){
              loggedIn = true;
            }
          }
        }

        callback(null, loggedIn)
      }
    })
  }

  static addPatient(newPatient,callback){
    Model.checkLogin("dokter",function(err,loggedIn){
      if(err){
        callback(err)
      }
      else{

        if(loggedIn){
          Model.readPatientsFile(function(err, data){
            if(err){
              callback(err);
            }
            else{
              let newData = JSON.parse(data);
              console.log(newData)
              let id 
              if(newData.length === 0){
                id = 1;
              }else{
                id = newData[newData.length-1]["id"]+1
              }
              let curPatient = new Patient(id, newPatient.name, newPatient.diagnosis)
      
              newData.push(curPatient)
      
              let writeData = JSON.stringify(newData, null, 2)
      
              Model.writePatientsFile(writeData, function(err, data){
                if(err){
                  callback(err)
                }
                else{
                  callback(null,newData)
                }
              })
            }
          })
        }
        else{
          callback("{you don't have access to add patient}")
        }

      }
    })
  }

}

module.exports = Model;