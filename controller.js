const Employee = require('./employee.js')
const Model = require('./model.js')
const View = require('./view.js')
const Patient = require('./patient.js')

class Controller {

  static register(info) {
     Employee.register(info, function(err, data) {
     if (err){
      View.err(err)
     } else {
       View.displayTotal(data)
     }
   })

  }

  static login(info){
    Employee.login(info ,function(err, data){
      if (err) {
        View.err(err)
      } else {
        View.login(data)
      }
    } )
  }

  static addPatient(info){
    Patient.addPatient(info, function(err , data) {
      if(err) {
        View.err(err)
      } else {
        View.addPatient(data)
      }
    })
  }

  static logout(info){
    Employee.logout(info ,function(err, data){
      if (err) {
        View.err(err)
      } else {
        View.logout(data)
      }
    } )
  }
}


module.exports = Controller