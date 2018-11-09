 const ModelEmployee = require('./Employee.js')
 const ModelPatient = require('./Patient.js')
 const View = require('./view')

class Controller {

    static registerEmployee(option){
        ModelEmployee.registerEmployee(option,function(err,data){
           if(err){
               View.displayError(err)

           }else{
               View.displayData(null,data)
           }
       })
    }
    static login(option){
        ModelEmployee.login(option,function(err,data){
            if(err){
                View.displayError(err)
            }else{
                View.displaylogin(data)
            }
        })
    }
    static addPatient(option){
        ModelEmployee.checkUser(option,function(err,data){
            if(err){
                View.displayError(err)
            }else{
                ModelPatient.addPantient(option,function(err,data,total){
                    if(err){
                        View.displayError(err)
                    }else{
                        View.displayaddPatient(total)
                    }
                })
            }
        })

    }
    static logout(option){
        ModelEmployee.logout(option,function(err,data){
            if(err){
                View.displayError(err)
            }else{
                View.displaylogout(data)
            }
        })
    }
}
module.exports = Controller