const Patient = require('../Models/Patient');
const View = require('../Views/Patient');

class PatientController {
    static addPatient(id, name, diagnosis) {
        Patient.cekUser((err, data) => {
            if (err) throw err
            else {
                if (data) {
                    let datapatient = new Patient(id, name, diagnosis)
                    datapatient.addPatient((err, data) => {
                        if (err) View.err(err)
                        else {
                            View.printLine(`Data pasien ${name} sudah ditambahkan`)
                        }
                    })
                } else {
                    View.printLine('Anda tidak memiliki akses untuk add patients')
                }
            }
        })

    }
}

module.exports = PatientController