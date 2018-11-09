const {
    Employee
} = require('../Models/Employee')
const {
    Dokter
} = require('../Models/Employee')
const {
    Officeboy
} = require('../Models/Employee')
const {
    Recepcionist
} = require('../Models/Employee')
const {
    Admin
} = require('../Models/Employee')
// const Patient = require('./Models/Patients')
const View = require('../Views/view')


class Controller {
    static register(username, password, role) {
        Employee.register(username, password, role, (err, data) => {
            if (err) {
                View.viewError(err)
            } else {
                View.viewData(data)
            }
        })
    }
    static login(username, password) {
        Employee.login(username, password, (err, data) => {
            if (err) {
                View.viewError(err)
            } else {
                View.viewData(data)
            }
        })
    }
    static logout(username) {
        Employee.logout(username, (err, data) => {
            if (err) {
                View.viewError(err)
            } else {
                View.viewData(data)
            }
        })
    }
    static addPatient(name, diagnosa) {
        Employee.addPatient(name, diagnosa, (err, data) => {
            if (err) {
                View.viewError(err)
            } else {
                View.viewData(data)
            }
        })

    }

}


module.exports = Controller