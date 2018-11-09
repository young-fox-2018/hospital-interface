const fs = require('fs')
const Patient = require('/Users/admin/Documents/Phase 1/Week 2/hospital-interface/models/PatientModel.js')

// const Controller = require('../controllers/Controller.js')

class Employee {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
      this.isLogin = false
    }

    static readFile(callback) {
      fs.readFile('./models/employee.json', 'utf8', function(err, data){
        if(err) {
          let obj = {
            message : 'error readFile',
            details : err
          }
          callback(obj)
        } else {
          callback(null, data)
        }
      })
    }

    static readPatientFile(callback) {
      fs.readFile('./models/patient.json', 'utf8', function(err, data){
        if(err) {
          let obj = {
            message : 'error read File pasien',
            details : err
          }
          callback(obj)
        } else {
          callback(null, data)
        }
      })
    }

    static writeFile(data, callback) {
      fs.writeFile('./models/employee.json', JSON.stringify(data, null, 4), function(err){
        if(err) {
          let obj = {
            message : 'error writeFile',
            details : err
          }
          callback(obj)
        } else {
          callback(null)
        }
      })
    }

    static writePatientFile(data, callback) {
      fs.writeFile('./models/patient.json', JSON.stringify(data, null, 4), function(err){
        if(err) {
          let obj = {
            message : 'error write File pasien',
            details : err
          }
          callback(obj)
        } else {
          callback(null)
        }
      })
    }

    static addEmployee(input, callback) {
      Employee.readFile(function(err, data){
        if(err) {
          callback (err)
        } else {
          let newData = JSON.parse(data)
          let newEmployee = new Employee(input[0], input[1], input[2], input[3])    
          newData.push(newEmployee)
          Employee.writeFile(newData, function(err) {
            if(err) {
              callback(err)
            } else {
              callback(null)
            }
          })
        }
      }) 
    }

    static login(input, callback) {
      Employee.readFile(function(err, data) {
        if(err) {
          callback (err, null)
        } else {
          let newData = JSON.parse(data)
          let userName = input[0]
          let password = input[1]
          //tempindex -1
          let tempIndex = -1

          //checklogged digunakan untuk menandai sudah ada yang login
          let checkLogged = true
          //loggedsuccess digunakan untuk menandai belum ada yang login
          let loggedSucces = false

          for(let i = 0; i < newData.length; i++) {
            if(newData[i].isLogin === true) {
              checkLogged = false
            } else if (newData[i].username === userName && newData[i].password === password) {
              //tempindex jika ada yang match tempindex berisi index object yang match
              tempIndex = i
              //loggsuccess diubah menjadi true
              loggedSucces = true
            }
          }

          //kalau checklogged masih salah tampilin error ada yang login
          if (!checkLogged) {
            callback('ada yang login')
          } else {
            //jika loggedsuccess salah info tampilin username salah
            if (!loggedSucces) {
              callback('username atau password salah')
            } else {
              //selain itu ubah data dan write kembali data tersebut
              // writeFIile
              newData[tempIndex].isLogin = true
              Employee.writeFile(newData, function(err) {
                if(err) {
                  callback (err)
                } else {
                  callback (null)
                }
              })
            }
          }
        }
      })
    }

    static logout(input, callback) {
      Employee.readFile(function(err, data) {
        if(err) {
          callback(err)
        } else {
          let username = input[0]
          let data2 = JSON.parse(data)
          for(let i = 0; i < data2.length; i++) {
            if(data2[i].username === username && data2[i].isLogin === true) {
              data2[i].isLogin = false
            }
          }

          Employee.writeFile(data2, function(err) {
            if(err) {
              callback(err)
            } else {
              callback(null)
            }
          })
        }
      })
    }

    static addPatient (input, callback) {
       Employee.readFile(function(err, data) {
         if(err) {
           callback(err)
         } else {
           let isDokter = false
           let data2 = JSON.parse(data)
           for(let i = 0; i < data2.length; i++) {
             if(data2[i].position === 'dokter' && data2[i].isLogin === true) {
               isDokter = true
             }
           }
           if(isDokter) {
             Employee.readPatientFile(function(err, data) {
               if(err) {
                 callback(err)
               } else {
                 let newData = JSON.parse(data)
                 let diagnosis = input.slice(1).join('')
                 let newPatient= new Patient(newData.length+1, input[0], diagnosis)
                 newData.push(newPatient)

                 Employee.writePatientFile(newData, function(err) {
                   if(err) {
                     callback(err)
                   } else {
                     callback (null)
                   }
                 })
               }
             })
           } else {
             callback('hanya bisa di akses dokter')
           }
         }
       })
    }
}

module.exports = Employee