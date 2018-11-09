const Model = require('../Models/patient')
const View = require('../Views/view')
class PatientController {
    static addPatient(name, diagnosis) {
        Model.addPatient(name, diagnosis, function (data, access) {
            View.showRegisterPatient(data, access)
        })
    }
}

module.exports = PatientController