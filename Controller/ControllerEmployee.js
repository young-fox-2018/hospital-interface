const View = require("../Views/View.js")
const ModelEmployee = require("../Models/ModelEmployee.js")

class ControllerEmployee {

    static register(name, password, position) {
        ModelEmployee.register(name,password,position,function(err,data){
            if(err){
                View.displayError(err)
            } else {
                View.displayData(`save data success ${JSON.stringify(data[data.length-1])}. Total Employee: ${data.length}`)
            }
        })
    }  

    static login(name,password){
        ModelEmployee.login(name,password,function(err,data){
            if(err){
                View.displayError(err)
            } else {
                View.displayData(`user ${data.username} logged in succesfully`)
            }
        })
    }

    static logout(name){
        ModelEmployee.logout(name,function(err,data){
            if(err){
                View.displayError(err)
            } else {
                View.displayData(`Logout user ${data.username} berhasil`)
            }
        })
    }

}

module.exports = ControllerEmployee