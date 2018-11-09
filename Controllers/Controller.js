const Employee  = require ('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-2/day-5/hospital-interface/Models/employee.js')
const Patient   = require ('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-2/day-5/hospital-interface/Models/patients.js')
const View      = require ('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-2/day-5/hospital-interface/View/view.js')


class Controller{

  static register(name , position , username ,password){
    Employee.register(name , position , username ,password ,function (err,data){
      if (err) console.log(err)
      else View.display("congrats , your registration success")
    })
  }

  static login(name,password){
    Employee.login(name,password,function(err,data){
      if(err) console.log(err)
      else View.display("congrats , you are login now")
    })
  }

}

// Controller.register('andromeda','direktur','aandroomeedaa','password')
module.exports = Controller
