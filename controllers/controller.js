const Employee = require("../models/employee")
const Patient = require("../models/patient")
const View = require("../views")

class Controller {
    static help() {
        let help = Employee.help()
        View.displayData(help)
    }
    static register(data) {
        Employee.register(data, (err, data) => {
            if (err) View.displayErr(err)
            else View.displayData(`save data succes ${JSON.stringify(data[data.length - 1])}. \n . Total Employee : ${data.length} `)
        })
    }
    static login(username, password) {
        Employee.login(username, password, (err, data) => {
            if (err) View.displayErr(err)
            else View.displayData(`User ${username} logged in successfully`)
        })
    }
    static logout(username) {
        Employee.logout(username, (err, data) => {
            if (err) View.displayErr(err)
            else View.displayData(`User ${username} logged out successfully`)
        })
    }
    static addPatient(name, diagnosis) {
        Patient.addPatient(name, diagnosis, (err, data) => {
            if (err) View.displayErr(err)
            else View.displayData(`save data succes ${JSON.stringify(data[data.length - 1])}. \n . Total Patient : ${data.length}`)
        })
    }
}

module.exports = Controller