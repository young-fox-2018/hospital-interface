const Employee = require('./Models/EmployeeModel.js')
const Patient = require('./Models/PatientModel.js')
const View = require('./view.js')

class Controller {
  static register(name, username, password, position) {
    if (name === undefined || username === undefined || password === undefined || position === undefined) {
      View.viewData('Isian belum lengkap')
    }
    else {
      let data = Employee.register(name, username, password, position, function(err, data) {
        if (err) {
          View.viewData(err)
        }
        else {
          View.viewDataRegister(data)
        }
      })
    }
  }

  static login(username, password) {
    let data = Employee.login(username, password, function(err, data) {
      if (err) {
        View.viewData(err)
      }
      else {
        View.viewDataLogin(data)
      }
    })
  }

  static addPatient(patient_id, patient_name, patient_diagnosis) {
    Employee.addPatient(patient_id, patient_name, patient_diagnosis, function(err, data) {
      if (err) {
        View.viewData(err)
      }
      else {
        View.viewDataAddPatient(data)
      }
    })
  }
}

module.exports = Controller