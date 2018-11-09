const fs = require("fs")
const patient = require('./Patient.js')
class Employee {
    constructor(name,username,password,position) {
        this.name = name
        this.username = username
        this.password = password
        this.position = position
        this.login = false
    }
    static readFile(callback){
       fs.readFile("./employee.json",function (err,data){
           if(err){
               callback(err)
           }else{
               callback(null,JSON.parse(data))
           }
       })
    }
    static writeFile(data,callback){
        fs.writeFile('./employee.json',JSON.stringify(data,null,2),function(err){
            if(err){
                callback(err)
            }else{
                callback(null)
            }
        })
    }
    static registerEmployee(option,callback){
        // console.log(option)
        this.readFile(function(err,data){
            if(err){
                callback(err)
            }else{
                // console.log(option)
                let newData = data
                // console.log(typeof newData)
                let employ = new Employee(option[0],option[1],option[2],option[3])
                newData.push(employ)
                Employee.writeFile(newData,function(err){
                    if(err){
                        callback(err)
                    }else{
                        callback(null, newData)
                    }

                })
            }
        })
    }
    static searchData(option,callback){
        this.readFile(function(err,data){
            if(err){
                callback(err)
                
            }else{
                for(let i = 0 ; i < data.length; i++){
                    if(data[i][option.field] === option.value){
                        callback(null,data[i])
                    }
                }
            }
        })
    }
    static updatedEmployee(name,field,value,callback){
        this.readFile(function(err,data){
            if(err){
                callback(err)
            }else{
           
                for(let i = 0 ; i < data.length; i++){
                    if(data[i].name === name){
                        data[i][field] = value
                    }

                }
                Employee.writeFile(data,function(err){
                    if(err){
                        callback(err)
                    }else{
                        callback(null)
                    }
                })
            }
        })

    }
    static login(option,callback){
        let username = option[0]
        let password = option[1]
        this.readFile(function(err,data){
            if(err){
                callback(err)
            }else{
                
                let checklogin = true;
                for(let i = 0 ; i < data.length ; i++){
                    if(data[i].login === true){
                        checklogin = false
                    }
                }
                if(checklogin === false){
                    callback("hanya bisa satu user yg login")
                }else{
                   let obj = {
                        field : "username",
                        value: username
                   } 
                   Employee.searchData(obj,function(err,data){
                       if(err){
                           callback(err)
                       }else{
                           if(data.password === password){
                               
                               Employee.updatedEmployee(data.name ,"login",true,function(err){
                                   if(err){
                                       callback(err)
                                   }else{
                                       callback(null,data.name)
                                   }
                               })
                           }else{
                               cb("username/password wrong!")
                           }
                       }
                   })
                }
                
                
            }
        })
    }
    static checkUser(option,callback){
        this.readFile(function(err,data){
            if(err){
                callback(err)
            }else{
                let checklogin = false
                let checkdokter = false
                for(let i = 0 ; i < data.length ; i++){
                    if(data[i].login === true){
                        checklogin = true
                        if(data[i].position === "dokter"){
                            checkdokter = true
                        }
                    }
                }
                if(checklogin === false){
                    callback("silahkan login terlebih dahulu")
                }else if(checklogin === true && checkdokter === false){
                    callback("tidak memiliki akses untuk add patients!")
                }else{
                    callback(null,true)
                }
            }
        })

    }
    static logout(option,callback){
        Employee.readFile(function(err,data){
            if(err){
                callback(err)
            }else{
                let obj = {
                    field: "username",
                    value: option[0]
                }
                Employee.searchData(obj,function(err,data){
                    if(err){
                        callback(err)
                    }else{
                        if(data.login === true){
                            Employee.updatedEmployee(data.name,"login",false,function(err){
                                if(err){
                                    callback(err)
                                }else{
                                    callback(null,data.name)
                                }
                            })
                        }else{
                            callback("Anda tidak login")
                        }
                    }
                })
            }
        })
    }
  }

module.exports = Employee