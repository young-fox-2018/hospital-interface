const fs = require('fs');

class Patient {
    constructor(patient) {
        this.id = patient.id,
        this.name = patient.name,
        this.doctor = patient.doctor,
        this.diagnosis = patient.diagnosis
    }

    static getPatients(callback) {
        fs.readFile('./models/patients.json', 'utf8', function(err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, JSON.parse(data));
            }
        });
    }

    static savePatients(patients, callback) {
        fs.writeFile('./models/patients.json', JSON.stringify(patients, null, 2), 'utf8', function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        })
    }

    static addPatient(doctor, patient, callback) {
        Patient.getPatients(function(err, data) {
            if (err) {
                callback(err);
            } else {
                let newPatient = {
                    id : data.length+1,
                    name : patient[0],
                    doctor: doctor.name,
                    diagnosis : patient.slice(1)
                }                
                data.push(new Patient(newPatient));

                Patient.savePatients(data, function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, newPatient, data.length)
                    }
                })                
            }
        })
    }

}

module.exports = Patient