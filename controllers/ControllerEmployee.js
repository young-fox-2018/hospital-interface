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
        Employee.login(username, password, function(err, data, isLoginAccount){
            if(err) {
                EmployeeView.displayLoginError()
            } else {
                if (data !== null) {
                    EmployeeView.displayError(data,isLoginAccount)
                }else {
                    EmployeeView.displayLoginSuccess(username)
                }
            }
        })
    }

    static logout() {
        Employee.logout(function(err, data){
            if(err) {
                EmployeeView.displayError()
            } else if(data === null){
                EmployeeView.displayError(402)
            } else{
                EmployeeView.displayLogoutSuccess(data)
            }
        })
    }
    
    static addPatient(nama, sakit) {
        Employee.addPatient(nama, sakit, function(err, data) {
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

    static help() {
        EmployeeView.help()
    }
}

module.exports = EmployeeController