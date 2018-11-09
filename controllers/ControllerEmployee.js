const fs = require('fs')
const Employee = require('../models/Employee')
const EmployeeView = require('../views/EmployeeView')

class EmployeeController {

    static register(username, password, role){        
        Employee.register(username,password,role, function(err, newData, data){
            if(err) {  
                EmployeeView.displayError(err)
            } else {
                EmployeeView.displayRegisterSuccess(newData, data)
            }
        })
    }

    static login(username, password) {
        Employee.login(username, password, function(err, data){
            if(err) {
                EmployeeView.displayLoginError()
            } else {
                if (data === null) {
                    EmployeeView.displayError(404)
                }else {
                    EmployeeView.displayLoginSuccess(username)
                }
            }
        })
    }
    
    static addPatient(id, nama, sakit) {
        Employee.addPatient(id, nama, sakit, function(err, data) {
            if(err) {
                EmployeeView.displayError(err)
            }else {
                if (data === null) {
                    EmployeeView.displayError(402)
                }else if (data === 401){
                    EmployeeView.displayError(data)
                }else{
                    EmployeeView.displaySuccessAddPatient(data)
                }
            }
        })

    }

}

module.exports = EmployeeController