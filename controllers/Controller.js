const Employee = require('../models/Employee')
const Patient = require('../models/Patient')
const View = require('../views/View')

class Controller {
    static regiser(username, password, position) {
        Employee.register(username, password, position, function(err, data, length) {
            if (err) {
                View.displayErr(err);
            } else {
                View.displayRegister(data, length);
            }
        });
    }

    static login(username, password) {
        Employee.login(username, password, function(err, data) {
            if (err) {
                View.displayErr(err);
            } else {
                View.displayLogin(data);
            }
        })
    }

    static addPatient(id, name, diagnosis) {
        Patient.addPatient(id, name, diagnosis, function(err, data, length) {
            if (err) {
                View.displayErr(err);
            } else {
                View.displayAddPatient(data, length)
            }
        })
    }

}

module.exports = Controller