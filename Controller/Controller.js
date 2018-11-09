const Employee = require('../Models/Employee')
const Patient = require('../Models/Patient')
const View = require('../Views/View')

class Controller {

    static register (option) {
        Employee.registerEmployee(option, function(err, data, newData) {
            if(err) {
                View.erorDisplay(err)
            } else {
                View.registerData(data, newData)
            }
        })
    }

    static login (option) {
        Employee.login(option, function(err, data){
            if(err) {
                View.erorDisplay(err)
            } else {
                View.loginInfo(data)
            }
        })
    }

    static addPatient (option) {
        Employee.addPatient(option, {
           field: 'login',
           value: true 
        }, function(err, data) {
            if(err) {
                View.erorDisplay(err)
            } else {
                View.addPatientInfo(data)
            }
        })
    }

    static logout (option) {
        Employee.logout(option, function(err, data) {
            if(err) {
                View.erorDisplay(err)
            } else {
                View.logoutInfo(data)
            }
        })
    }

}

module.exports = Controller