const fs = require('fs')
const Patient = require('./Patient')
const file_path = './models/employee.json'
const file_patient = './models/patient.json'

class Employee {
    constructor(name, username, password, position) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
      this.login = false
    }
    static readFile(file,callback){
        fs.readFile(file, 'utf8', function(err,data){
            if(err) {
               callback(err)
            } else{
                data = JSON.parse(data)
                callback(null, data)
            }
        })
    }
    static writeFile(file, data, callback){
        fs.writeFile(file, data, function(err){
            if(err){
                callback(err)
            } else{
                callback(null)
            }
        })
    }

    static register(username, password, role, callback) {
        Employee.readFile(file_path, function(err, data){
            if(err){
                callback(err)
            }else{
                let objEmployee = new Employee(username, username, password, role)
                data.push(objEmployee)
                
                Employee.writeFile(file_path, JSON.stringify(data, null, 2), function(err){
                    if(err){
                        callback(err)
                    } else{
                        callback(null, JSON.stringify(objEmployee), data)
                    }
                })
            }
        } )
    }

    static login(username, password, callback) {
        Employee.readFile(file_path, function(err, data){
            if(err){
                callback(err)
            } else{
                var index = data.findIndex((element) => element.login === true)
                if(index !== -1) {
                    // console.log(data[index])
                    callback(null, 403, data[index])
                } else{
                    var index = data.findIndex((element) => element.username === username && element.password === password)
                    if ( index === -1 ) {
                       callback(null, 404) 
                    } else {
                        data[index].login = true
                        Employee.writeFile(file_path, JSON.stringify(data, null, 2), function(err){
                            if(err){
                                callback(err)
                            } else{
                                callback(null, null)
                            }
                        })
                    }
                }
            }
        })
    }

    static logout(callback){
        Employee.readFile(file_path, function(err, data){
            if(err){
                callback(err)
            } else{
                var index = data.findIndex((element) => element.login === true)
                if(index === -1) {
                    // console.log(data[index])
                    callback(null, null)
                } else{
                    data[index].login = false
                    Employee.writeFile(file_path, JSON.stringify(data, null, 2), function(err){
                        if(err){
                            callback(err)
                        } else{
                            callback(null, data[index])
                        }
                    })
                }
            }
        })
    }

    static addPatient(nama, sakit, callback) {
        Employee.readFile(file_path, function(err, data){
            if(err){
                callback(err)
            } else{
                // console.log(data)
                let index = data.findIndex((element) => element.login === true)
                if(index === -1) {
                    callback(null, null)
                } else{
                    if(data[index].position === 'dokter') {
                        console.log("Selamat datang Dokter")
                        fs.readFile(file_patient, function(err, dataPatient){
                            if(err) {
                                callback(err)
                            }else{
                                // console.log((dataPatient))
                                dataPatient = JSON.parse(dataPatient)
                                let new_id = dataPatient.length + 1
                                let newPatient = new Patient(new_id, nama, sakit)
                                console.log(newPatient)
                                // dataPatient.push(newPatient)
                               dataPatient.push(newPatient)
                                Employee.writeFile(file_patient, JSON.stringify(dataPatient, null, 2), function(err){
                                    if(err){
                                        callback(err)
                                    } else{
                                        callback(null, dataPatient)
                                    }
                                })
                            }
                        })
                    } else{
                        callback(null, 401)
                    }
                }

            }
        })
    }

  }

  module.exports = Employee