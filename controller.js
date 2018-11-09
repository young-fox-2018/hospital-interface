const Model = require("./Models/Model")
const View = require("./View")

class Controller{

    static list(){
        Model.readFile(function(err, data){
            if(err){
                View.displayError(err);
            }
            else{
                View.display(data)
            }
        })
    }

    static register(curData){
        Model.register(curData , function(err, data){
            if(err){
                View.displayError(err);
            }
            else{
                View.display(`data with username ${curData.username} has been successfully registered`)
            }
        })
    }

    static login(curData){
        Model.login(curData.username, curData.password, function(err, data){
            if(err){
                View.displayError(err);
            }
            else{
                View.display(`user ${curData.username} logged in successfully`)
            }
        })
    }

    static logout(){
        Model.logout(function(err){
            if(err){
                View.displayError(err)
            }
            else{
                View.display(`You successfully logged out`)
            }
        })
    }

    static listPatient(curData){
        Model.readPatientsFile(function(err,data){
        if(err){
            View.displayError(err)
        }
        else{
            View.display(data)
        }
        })
    }

    static addPatient(curData){
        Model.addPatient(curData, function(err,data){
            if(err){
                View.displayError(err);
            }
            else{
                View.display(`data pasien berhasil ditambahkan. Total data pasien : ${data.length}`)
            }
        })
    }
}

module.exports = Controller