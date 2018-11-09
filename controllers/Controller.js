const View = require('/Users/admin/Documents/Phase 1/Week 2/hospital-interface/views/View.js')
const EmployeeModel = require('/Users/admin/Documents/Phase 1/Week 2/hospital-interface/models/EmployeeModel.js')

class Controller {
    static register(input) {
        EmployeeModel.addEmployee(input, function(err){
            if(err){
                View.addErr(err)
            } else {
                View.addSuccess()
            }
        })
    }

    static login(input) {
        EmployeeModel.login(input, function(err, data) {
            if(err) {
                View.loginErr(err)
            } else {
                View.loginSuccess(data)
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
        EmployeeModel.addPatient(input, function(err, data) {
            if(err) {
                View.addPatienterr(err)
            } else {
                View.addPatientSuccess(data)
            }
        })
    }
}

module.exports = Controller