const fs = require('fs')

const Controller = require('../controllers/Controller.js')


class Employee {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
      this.isLogin = false
    }

    static readFile(path,callback) {
      fs.readFile(path, 'utf8', function(err, data){
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

    static addEmployee(input, callback) {
      Employee.readFile('./models/employee.json', function(err, data){
        if(err) {
          callback (err)
        } else {
          let newData = JSON.parse(data)
          let newEmployee = new Employee(input[0], input[1], input[2], input[3])    
          newData.push(newEmployee)
          Employee.writeFile('./models/employee.json', newData, function(err) {
            if(err) {
              callback(err)
            } else {
              callback(null)
            }
          })
        }
      }) 
    }

    static writeFile(data, callback) {
      fs.writeFile(path, JSON.stringify(data, null, 4), function(err){
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

    static login(input, callback) {
      Employee.readFile('./models/employee.json', function(err, data) {
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
              Employee.writeFile('./models/employee.json', newData, function(err) {
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
 
    static findOne(callback) {
      // cari employee yang sedang login { id: 1, name: 'rama', role: 'doctor'}
      Employee.readFile('./models/employee.json', function(err, data) {
        let isDokter = {}
        if(err) {
          callback (err,null)
        } else {
          newData = JSON.parse(data)
          for(let i = 0; i < newData.length; i++) {
            if(newData[i].position === 'dokter' && newData[i].isLogin === true) {
              isDokter = {
                name : newData[i].name,
                position : newData[i].position
              }
            }
          }
          callback(null,isDokter)
        }
      })
    }

    static addPatient (input) {
       // input bentuknya object literal 

       Employee.findOne(function(err,data){
         if(err){
           console.log(err)
         }else{
           console.log("data ==> ",data)
         }
       })
    }
}

module.exports = Employee