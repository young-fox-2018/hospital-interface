const View = require("../Views/View.js")
const ModelEmployee = require("../Models/ModelEmployee.js")

class ControllerEmployee{

    static register(name,password,position){
        ModelEmployee.register(name,password,position,function(err,data){
            if(err){
                View.displayError(err)
            } else {
                // null,`save data success ${JSON.stringify(obj)}. Total Employee: ${data.length}`
                // data = `save data success ${JSON.stringify(data)}. Total Employee: ${data.length}`
                // console.log("=====",data)
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
                // if(data){
                // }
            }
        })
    }

}

module.exports = ControllerEmployee