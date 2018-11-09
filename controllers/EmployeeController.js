const util = require('util')
const Employee = require('../models/Employee')
const View = require('../views/View')

class EmployeeController {

    static help(){
        View.showData(`
        menu:
        register <username> <password> <role>
        login <username> <password>
        addPatient <patient name> <diagnosa1> <diagnosa2> <diagnosa3> ...
        logout`)
    }

    static register(username, password, role){
       Employee.register(username, password, role, function(err, data){
           if(err) View.showError(err)
           else{
               View.showData(`save data success ${util.inspect(data[data.length-1], {showHidden: false, depth: null})}. Total employee ${data.length}`)
           }
       })
    }

    static login(username, password){
        Employee.login(username, password, function (err, data){
            if(err) View.showError(err)
            else{
                View.showData(data)
            }
        })
    }

    static logout(){
        Employee.logout(function (err) {
            if(err) View.showError(err)
            else View.showData("All users has been logged out")
        })
    }
}

module.exports = EmployeeController