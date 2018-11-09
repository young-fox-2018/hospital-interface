const Employee = require("./models/employee")
const Patient = require("./models/patient")
const View = require("./view")

class Controller {
    static addEmployee(name, password, position) {
        Employee.addEmployee(name, password, position, function(err, data) {
            if (err) View.printError(err) 
            else {
                View.addEmployee(data)         
            }
        })
    }

    static logout() {
        Employee.logout(function(err, data) {
            if (err) View.printError(err)
            else {
                View.printMessage(data, "has successfully logout")
            }
        })
    }

    static login(username, password) {
        Employee.login(username, password, function(err, data) {
            if (err) View.printError(err)
            else {
                if (data) {
                    View.printMessage(data, "has successfully login")
                } else {
                    View.printLine("Username/password salah")
                }
                
            }
        })
    }

    static addPatient(patient_name, diagnosis) {
            Employee.addPatient(patient_name, diagnosis, function(err, data) {
                    if (err) View.printError(err)
                    else {
                        if (data) {
                            View.addPatient(data)
                        } else {
                            View.printLine("Tidak memiliki akses untuk add patient")
                        }
                    }
            })
    }

}

module.exports = Controller