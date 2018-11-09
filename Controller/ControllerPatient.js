const View = require("../Views/View.js")
const ModelPatient = require("../Models/ModelPatient.js")

class ControllerPatient{
    static addPatient(id,name,diagnosis){
        ModelPatient.addPatient(id, name, diagnosis, function(err, data){
            if(err){
                View.displayError(err)
            } else {
                View.displayData(`Data pasien berhasil ditambahkan. Total data pasien ${data.length}`)
            }
        })
    }
}

module.exports = ControllerPatient