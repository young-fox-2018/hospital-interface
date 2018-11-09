const fs = require("fs")
const employeePath = "./employee.json"
const patientPath = "./patient.json"
const Patient = require("./patient")

class Employee { // available position: admin, office boy, receptionist, doctor
    constructor(name, position, password) {
      this.id = null
      this.name = name
      this.position = position
      this.username = name
      this.password = password
      this.isLogin = false
    }

    static readFile(path, callback) {
          fs.readFile(path, "utf-8", function(err, data) {
              if (err) callback(err, null)
              else {
                  data = JSON.parse(data)
                  callback(null, data)
              }
          })  
    }

    static writeFile(path, data, callback) {
          fs.writeFile(path, data, "utf-8", function(err) {
                if (err) {
                    callback(err)
                } else {
                    callback(null)
                }
          })
    }

    static addEmployee(name, password, position, callback) {
        let newEmployee = new Employee(name, position, password)
        Employee.readFile(employeePath, function(err, data) {
              if (err) callback(err , null)
              else {
                newEmployee.id = data.length + 1
                data.push(newEmployee)
                Employee.writeFile(employeePath, JSON.stringify(data, null, 4), function(err) {
                    if (err) callback(err, null)
                    else {
                        // idealnya abis kita write trus kita readfile lagi karena pas involved database
                        // kita bakal ambil lagi data terbarunya.. tpi karena gw mles jadi langsung callback aja
                        // trus read file yang di atas kan cuman buat auto increment.. sebenarnya kalau da pakai database
                        // tidak perlu karena auto increment nya dari database
                        callback(null, data)
                    }
                })
              }
        })
    }
    
    static login(username, password, callback) {
        Employee.readFile(employeePath, function(err, data) {
              if (err) callback(err, null)
              else {
                  // cek jika ada user lain yang login
                  //let otherLogin = true // kenapa kalau pake for ataupun for loop g bisa ke detect si other log in          
                  let login_index = data.findIndex(function(element) {
                      return element.isLogin == true
                  })

                  if (login_index == -1) {
                      // g ada yang login, saatnya login 
                      let somethingWrong = true
                      data.forEach(employee => {
                          if (employee.username == username && employee.password == password) {
                              employee.isLogin = true
                              Employee.writeFile(employeePath, JSON.stringify(data, null, 4), function(err) {
                                    if (err) callback(err, null)
                                    else {
                                        callback(null, employee)
                                    }
                              })
                              somethingWrong = false
                          } 
                      });
                      if (somethingWrong) callback(null, null)     
                  } else {
                        callback(`Another user has logged in, logout first`, null)
                      }
                  }      
              }
     )}
  
    static logout(callback) {
        Employee.readFile(employeePath, function(err, data) {
              if (data == null) callback(err, null)
              else {
                  data.forEach(employee => {
                      if (employee.isLogin == true) {                        
                          employee.isLogin = false                
                          Employee.writeFile(employeePath, JSON.stringify(data, null, 4), function(err) {
                                if (err) callback(err, null)
                                else {
                                    callback(err, employee)
                                }
                          })
                      }
                  });
              }
        })
    }

    static addPatient(patient_name, diagnosis, callback) {
        Employee.readFile(employeePath, function(err, employee_data) {
              if (err) callback(err, null)
              else {
                  let doctor_index = employee_data.findIndex(function(element) {
                        return element.isLogin == true && element.position == "doctor"
                  })
                  if (doctor_index == -1) {
                        callback(null, null)
                  } else {
                        let newPatient = new Patient(patient_name, diagnosis)
                        newPatient.doctors.push(employee_data[doctor_index].name)
                        Employee.readFile(patientPath, function(err, patient_data) {
                            if (err) callback(err, null)
                            else {
                                  newPatient.id = patient_data.length + 1
                                  patient_data.push(newPatient)
                                  Employee.writeFile(patientPath, JSON.stringify(patient_data, null, 4), function(err) {
                                          if (err) callback(err, null)
                                          else {
                                              callback(null, patient_data)
                                          }
                                  })
                            }
                        })
        
                  }
              }
        })
    } 
}

Employee.addPatient("hola", ["stroke", "darah tinggi"], function(x) {
    console.log(x)
})

module.exports = Employee
  



  