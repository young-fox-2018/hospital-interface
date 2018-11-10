
const Patient = require("../Models/Patient.js");
const Employee = require("../Models/Employee.js");
const View = require("../Views/view");

class Hospital {
    static register(name, position, username, password) {
        Employee.register(name, position, username, password,function(err, data){
            if(err){
                console.log(err)
            } else {
                View.display(`Save data success! Total employee: ${data.length}`)
            }
        })
    }

    static findAll() {
        Employee.findAll(function(err,data){
            if(err){
                console.log(err)
            } else {
                View.displayFindAll(data)
            }
        })
    }

    static login(username, password) {
        Employee.login(username, password, function(err, data){
            if(err) {
                console.log(err)
            } else {
                View.displayLogin(data)
            }
        })
    }
}

module.exports = Hospital