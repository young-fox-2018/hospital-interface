const Employee = require('../models/Employee');
const Patient = require('../models/Patient');
const View = require('../views/View');

class Controller {

    static help() {
        View.help();
    }

    static listEmployee() {
        Employee.getEmployee(function(err, data) {
            if (err) {
                View.displayError(err);
            } else {
                View.displayEmployee(data)
            }
        });
    }

    static register(employee) {
        Employee.addEmployee(employee, function(err, data, length) {
            if (err) {
                View.displayError(err);
            } else {
                View.registerView(data, length);
            }
        });
    }

    static login(data) {
        Employee.login(data, function(err, data) {
            if (err) {
                View.displayError(err);
            } else {
                View.loginPage(data.name);                
            }
        })
    }

    static logout() {
        Employee.logout(function(err, data) {
            if (err) {
                View.displayError(err);
            } else {
                View.logoutPage();
            }
        });
    }

    static addPatient(patient) {
        Employee.getLoggedIn(function(err, data) {
            if (err) {
                View.displayError(err);
            } else {
                // validate if it's dokter
                if (data.position !== 'dokter') {
                    View.restrictedPage();
                } else {
                    if (patient.length === 0) {
                        View.displayError(`Please input patient data`);
                    } else {
                        Patient.addPatient(data, patient, function(err, data, length) {
                            if (err) {
                                View.displayError(err);
                            } else {
                                View.savePatient(length);
                            }
                        });
                    }
                }

            }
        })
    }

    static wrongCommand(){
        View.displayError(`Wrong command`);
    }

}

module.exports = Controller;