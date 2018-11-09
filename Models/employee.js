const Controller = require ('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-2/day-5/hospital-interface/Controllers/Controller.js')
const pathEmp    = '/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-2/day-5/hospital-interface/database/employee.json'
const pathDum    = '/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-2/day-5/hospital-interface/database/dummy.json'
const View       = require ('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-2/day-5/hospital-interface/View/view.js')
const fs         = require ('fs')
class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.islogin  = false
  }

  static readData(path,cb){
      fs.readFile(path,'utf8', (err, data) => {
        if (err) throw err;
        cb(null,data)
      });
    }

  static writeData(path,newData,cb){
      fs.writeFile(path,JSON.stringify(newData,null,4), (err, data) => {
        if (err) throw err;
        cb(null,data)
      });
    }

    static login(username,password,callback){
      Employee.readData(pathDum , (err,data)=>{
        if (err) throw err
        else{
          let logged = false
          let user = JSON.parse(data)
          for(let i = 0;i<user.length;i++){
            if(user[i].username===username){
              if(user[i].islogin===true){
                logged=true
                callback('You are Already Logged')
                break
              }
            }
          }

          for(let j = 0 ;j<user.length;j++){
            if( user[j].username===username){
              if(user[j].password===password && user[j].islogin===false){
                user[j].islogin = true
                logged=true
                Employee.writeData(pathDum,user,(err)=>{
                  if(err) throw error
                  else(
                    callback()
                  )
                })
              }else if(user[j].username===username && user[j].password !== password){
                logged =true
                callback('password anda salah')
              }
            }
          }
          if(logged===false){
            callback('Maaf Username Yang anda masukan tidak terdaftar , silahkan daftar dulu')
          }
        }
      })
    }

    static register(name , position , username ,password,callback){      
      Employee.readData(pathDum,(err,data)=>{
        if(err) throw err ;
        else{
          let dataEmp = JSON.parse(data)
          let stat = false
          for(let i=0;i<dataEmp.length;i++){
            if(username===dataEmp[i].username){
              stat = true
              callback('maaf username yang anda masukan telah terdaftar sebelumnya')
              break
            }
          }
          if(stat===false){
            let user = new Employee (name , position , username ,password)
            dataEmp.push(user)
            callback(dataEmp)
            Employee.writeData(pathDum,dataEmp,(err,data=>{
              if(err) throw err ;
              else {
                callback(null)
              }

          }))

          }
        }
      })
    }


  }


// class Dokter{
//
// }
// class Admin{
//
// }
// class Officeboy{
//
// }
// class Receptionist{
//
// }
module.exports = Employee
