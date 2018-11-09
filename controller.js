let { Patient } = require("./model")
let { Employee } = require("./model")
let { Model } = require("./model")
let { View } = require("./view")

class Controller {
    static register(name, password, username, role) {
        Model.register(name, password, username, role, function(err,data){
            if (err) View.printLine(err)
            else View.printLine(data)
        })
        View.printLine("> Save data success!")
    }
    static login(username,password){
        Model.login(username, password, function(err,data){
            if(err) View.printLine(err)
            else{ View.printLine(data) }
        })
        
    }
    static logout(username){
        Model.logout(username, function(err,data){
            if(err) View.printLine(err)
            else View.printLine(data)
        })
    }
    static addPatient(name, diagnose){
        Model.addPatient(name, diagnose, function(err,data){
            if(err) throw err
            else {
                View.printLine(data)
            }
        })
    }
    
}

module.exports = {
    Controller: Controller,
    Patient: Patient,
    Employee: Employee
}