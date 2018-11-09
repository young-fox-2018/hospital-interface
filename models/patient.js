const Model = require("./model")
const dbPatient = "./database/patients.json"
const dbEmployee = "./database/employee.json"


class Patient extends Model {
    constructor(name, diagnosis) {
        super()
        this.id = null
        this.name = name
        this.diagnosis = diagnosis
    }

    static addPatient(name, diagnosis, callback) {
        let dataDiagnosis = ""
        for (let i = 0; i < diagnosis.length; i++) {
            if (i !== diagnosis.length - 1) dataDiagnosis += `${diagnosis[i]}, `
            else dataDiagnosis += `${diagnosis[i]}`
        }

        Patient.read(dbEmployee, (err, data) => {
            if (err) callback(err, null)
            else {
                let dataEmployee = JSON.parse(data)
                let isData = false
                dataEmployee.forEach(docter => {
                    if (docter.position === "Docter") isData = true
                });

                if (isData === false) {
                    callback("There was no doctor in the Databases")
                }
                else {
                    let isDocter = false
                    for (let i = 0; i < dataEmployee.length; i++) {
                        if (dataEmployee[i].position === "Docter" && dataEmployee[i].status === true) {
                            isDocter = true
                        }
                    }

                    if (isDocter === true) {
                        let newPatient = new Patient(name, dataDiagnosis)
                        Patient.generateId((err, data) => {
                            if (err) callback(err, null)
                            else {
                                newPatient.id = data
                                Patient.read(dbPatient, (err, data) => {
                                    if (err) callback(err, null)
                                    else {
                                        let dataPatien = JSON.parse(data)
                                        dataPatien.push(newPatient)
                                        Patient.save(dbPatient, dataPatien, (err, data) => {
                                            if (err) callback(err)
                                            else callback(null, dataPatien)
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else {
                        callback("There was no doctor avaliable")
                    }
                }
            }
        })
    }

    static generateId(callback) {
        Patient.read(dbPatient, (err, data) => {
            if (err) callback(err)
            else {
                let dataPatient = JSON.parse(data)
                if (dataPatient.length === 0) {
                    callback(null, 1)
                }
                else {
                    callback(null, (Number(dataPatient[dataPatient.length - 1].id) + 1))
                }
            }
        })
    }

}
module.exports = Patient