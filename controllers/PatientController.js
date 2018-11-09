const View = require('../views/View')
const Patient = require('../models/Patient')

class PatientController {

    static addPatient(name, diagnosa){
        Patient.addPatient(name, diagnosa, function (err, data) {
            if(err) View.showError(err)
            else{
                View.showData(`data pasien berhasil ditambahkan. Total data pasien: ${data.length}`)
            }
        })
    }
}

module.exports = PatientController