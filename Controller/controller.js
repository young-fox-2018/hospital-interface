
const Patient = require("../Models/Patient.js");
const Employee = require("../Models/Employee.js");
const View = require("../Views/view");

class Hospital {
    static register(name, username, position, password) {
        Employee.register(name, position, username, password,function(err, data){
            if(err) {
                View.display(err)
            } else {
                View.display(`Save data success! Total employee: ${data.length}`)
            }
        })
    }

    static findAll() {
        Employee.findAll(function(err,data){
            if(err){
                View.displayFindAll(err)
            } else {
                View.displayFindAll(data)
            }
        })
    }

    static login(username, password) {
        Employee.login(username, password, function(err, data){
            if(err) {
                View.displayLogin(err)
            } else {
                View.displayLogin(data)
            }
        })
    }
    static addPatient(id, name, diagnosis) {
        Patient.addPatient(id, name, diagnosis, function(err, data){
            if(err){
                View.displayPatient(err)
            } else {
                View.displayPatient(data)
            }
        })
    }
}

module.exports = Hospital