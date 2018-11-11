const View = require('/Users/admin/Documents/Phase 1/Week 2/hospital-interface/views/View.js')
const EmployeeModel = require('/Users/admin/Documents/Phase 1/Week 2/hospital-interface/models/EmployeeModel.js')
const PatientModel = require('/Users/admin/Documents/Phase 1/Week 2/hospital-interface/models/PatientModel.js')

class Controller {
    static register(input) {
        EmployeeModel.addEmployee(input, function(err, newEmployee, length){
            if(err){
                View.addErr(err)
            } else {
                View.addSuccess(newEmployee, length)
            }
        })
    }

    static login(input) {
        EmployeeModel.login(input, function(err, name) {
            if(err) {
                View.loginErr(err)
            } else {
                View.loginSuccess(name)
            }
        })
    }

    static logout(input) {
        EmployeeModel.logout(input, function(err, data) {
            if(err) {
                View.logoutErr(err)
            } else {
                View.logoutSuccess(data)
            }
        })
    }

    static addPatient(input) {
        PatientModel.addPatient(input, function(err, length) {
            if(err) {
                View.addPatienterr(err)
            } else {
                View.addPatientSuccess(length)
            }
        })
    }

    static patientStatus(input) {
        PatientModel.patientStatus(input, function(err, data) {
            if(err) {
                View.patientStatusErr(err) 
            } else {
                View.patientStatusSuccess(data)
            }
        })
    }
}

module.exports = Controller