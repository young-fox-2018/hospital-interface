const View = require('../views/View')
const Employee = require('../models/Employee')

class EmployeeController {
    static registerEmp(param) {
        Employee.registerEmp(param, function(err, data){
            if(err) {
                View.displayErr(err)
            } else {
                View.displayMsg(`total Employee : ${data.length}`)
            }
        })
    }

    static loginEmp(param) {
        Employee.loginEmp(param, function(err, data) {
            if (err) {
                View.displayErr(err)
            } else {
                View.displayMsg(`user ${data.username} logged in successfully`)
            }
        })
    }

    static logoutEmp() {
        Employee.logoutEmp(function (err, data) {
            if (err) {
                View.displayErr(err)
            } else {
                View.displayMsg(`user ${data.username} logged out successfully`)
            }
        })
    }

    static findOne(param) {
        Employee.findOne(param, function(err, data) {
            if (err) {
                View.displayErr(err)
            } else {
                View.displayMsg(data)
            }
        })
    }

    static help() {
        View.displayMsg(`
        wrong command :
        1. register <username> <password> <position>
        2. login <username> <password>
        3. addPatient <name> <diagnosis> <diagnosis> ...
        4. findOne <field> <value>
        5. logout
        `)
    }
}

module.exports = EmployeeController