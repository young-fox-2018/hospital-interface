const View = require('../views/View')
const Patient = require('../models/Patient')

class PatientController {
    static addPatient (param) {
        Patient.addPatient(param, function (err, data) {
            if (err) {
                View.displayErr(err)
            } else {
                View.displayMsg(`data pasien berhasil ditambahkan. Total data pasien : ${data.length}`)
            }
        })
    }
}

module.exports = PatientController