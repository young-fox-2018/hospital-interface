const Employee = require('../models/employee')
const Patient = require('../models/patient')
const View = require('../views/view')

class Controller {
    static register(username, password, role) {
        Employee.register(username, password, role, function(err, data) {
            if (err) View.displayError(err)
            else View.displayRegister(username, password, role, data)
        })
    }

    static findAll() {
        Employee.findAll(function(err, data) {
            if (err) View.displayError(err)
            else View.displayFindAll(data)
        })
    }

    static updateData(key, newValue) {
        Employee.updateEmployee(key, newValue, function(err) {
            if (err) View.displayError(err)
            else View.displayUpdate(key, newValue)
        })
    }

    static deleteEmployee() {
        Employee.deleteEmployee(function(err) {
            if (err) View.displayError(err)
            else View.displayDelete()
        })
    }

    static employeeLogin(username, password) {
        Employee.employeeLogin(username, password, function(err) {
            if (err) View.displayError(err)
            else View.displayLogin(username)
        })
    }

    static employeeLogout() {
        Employee.employeeLogout(function(err) {
            if (err) View.displayError(err)
            else View.displayLogout()
        })
    }

    static addPatient(name, diagnose) {
        Patient.addPatient(name, diagnose, function(err) {
            if (err) View.displayError(err)
            else View.displayAddPatient()
        })
    }

    static findAllPatients() {
        Patient.findAll(function(err, data) {
            if (err) View.displayError(err)
            else View.displayFindAllPatients(data)
        })
    }

    static updatePatient(id, field, newValue) {
        Patient.updatePatient(id, field, newValue, function(err) {
            if (err) View.displayError(err)
            else View.displayUpdatePatient(id, field, newValue)
        })
    }

    static deletePatient(id, name) {
        Patient.deletePatient(id, name, function(err) {
            if (err) View.displayError(err)
            else View.displayDeletePatient(id, name)
        })
    }
}

module.exports = Controller