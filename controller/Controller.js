"use strict"

const Employee = require('/Users/hacktiv8/Desktop/robert/robert/hospital-interface/models/Employee.js')
const View = require('../views/View')
const employeeFile = './employee.json'
const Patient = require('/Users/hacktiv8/Desktop/robert/robert/hospital-interface/models/Patient.js')

class Controller {
    static register(user) {
        Employee.registerEmployeetoDb(user, (err, result) => {
            if (err) {
                View.printError(err)
            } else {
                View.printData(`save data success ${(JSON.stringify(result[result.length - 1]))}. Total employee : ${result.length}`)
            }
        })
    } 
    
    static login(user) {
        Employee.login(user, (err, result) => {
            if (err) {
                View.printError(err)
            } else {
                View.printData(`user ${result.username} logged in successfully`)
            }
        })
    }

    static addPatient(patient) {

        Employee.findOne(employeeFile, null, 'loggedIn', true, (err , result) => {
            if (err) {
                View.printError(err)
            } else {
                Patient.addData(result, patient, (err, data) => {
                    if (err) {
                        View.printError(err)
                    } else {
                        View.printData(`data pasien berhasil ditambahkan. Total data pasien : ${JSON.stringify(data.length)}`)
                    }
                })
            }
        })
    }

    static logOut() {
        Employee.logOut(err=> {
            if (err) {
                View.printError(err)
            } else {
                View.printData(`User berhasil log out`)
            }
        })
    }
}

module.exports = Controller