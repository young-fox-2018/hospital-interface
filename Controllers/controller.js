const Employee = require('../Models/Employee')
const Patient = require('../Models/Patient')
const View = require('../Views/view')

class Controller{
    static execute(cmd, input){
        switch (cmd) {
            case "register":
                Employee.addEmployee(input, function(err, data) {
                    if (err){
                        View.displayError(err)
                    }
                    else{
                        View.display(`Successful Data Save! ${JSON.stringify(data[data.length-1])}. Total employee(s): ${data.length}`)
                    }
                })
                break;
            case "login":
                Employee.login(input, function(err, data){
                    if (err){
                        View.displayError(err)
                    }
                    else{
                        View.display(data)
                    }
                })
                break;
            case "addPatient":
                Employee.addPatient(input, function(err,data){
                    if (err){
                        View.displayError(err)
                    }
                    else{
                        View.display(`data pasien berhasil ditambahkan. Total data pasien : ${data.length}`)
                    }
                })
                break;
            case "logout":
                Employee.logout(function(err, data){
                    if(err){
                        View.displayError(err)
                    }
                    else{
                        View.display(data)
                    }
                })
                break;
            case "listPatients":
                Employee.listPatients(function(err, data){
                    if(err){
                        View.displayError(err)
                    }
                    else{
                        View.display(data)
                    }
                })
                break;
            case "listEmployees":
                Employee.readFile(function(err, data){
                    if(err){
                        View.displayError(err)
                    }
                    else{
                        View.display(data)
                    }
                })
                break;
            case "filter":
                Employee.filter(input, function(err, data){
                    if(err){
                        View.displayError(err)
                    }
                    else{
                        View.display(data)
                    }
                })
                break;
            default: View.help()
                break;
        }
    }
}
module.exports = Controller