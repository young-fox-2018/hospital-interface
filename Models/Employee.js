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
        let isHired = false
        for(let i in newData){
          if(newData[i]["name"] === input[0]){
            isHired = true
            cb(`${newData[i]["name"]} sudah menjadi karyawan!`)
          }
        }

        if(!isHired){
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
              let diagnosis = input.slice(1)
              let newPatient= new Patient(newData.length+1,input[0],diagnosis)
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

  static listPatients(cb){
    Employee.readFile(function(err, data){
      if(err){
        cb(err)
      }
      else{
        for(let i in data){
          if(data[i]["loggedIn"] === true && data[i]["position"] === "dokter"){
            Employee.readPatient(function(err,data){
              if(err){
                cb(err)
              }
              else{
                cb(null, data)
              }
            })
          }
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
        let allOut = true

        for(let i in checkData){
          if(checkData[i]["loggedIn"] === true){
            checkData[i]["loggedIn"] = false
            allOut = false
          }
        }

        if(!allOut){
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
        else{
          cb(`Tidak ada user yang logged in`)
        }
      }
    })
  }

  static filter(input, cb){
    // console.log(input)
    if(input.length <= 0){
      cb("Please insert the diagnosis/diagnoses you want to filter!")
    }
    else{
      Employee.readPatient(function(err,data){
        if(err){
          cb(err)
        }
        else{
          //Using forEach to check the tags in each patient diagnoses

          //should I add if isError()? biar bisa keluar error messagenya?
         
          let filtered = []
         data.forEach(function(dataPatient){
          //  console.log(dataPatient["diagnosis"])
           dataPatient["diagnosis"].forEach(function(diagnosisList){
            input.forEach(function(filterTag){
              if(diagnosisList === filterTag){
                filtered.push(dataPatient)
              }
            }) 
           })
          })

          // filter() to remove duplicates && indexOf to find out the duplicates
          // console.log(filtered.indexOf("Arnold"), "++++++++++++++++++++++++")
          

          //Kalau dibaca, aku mau tanya ini dong ka, logic-nya ku jadi belibet sendiri hahahahah
          let unique = filtered.filter((patient,iFiltered,comparisonArray) => comparisonArray.indexOf(patient) === iFiltered)
          if(unique.length <= 0){
            cb(`No one have that diagnosis!`)
          }
          else{
            cb(null, unique) 
          }
        }
      })
    }

  }

}

module.exports = Employee