const fs = require('fs')

class Patient {
    constructor(id = 0, name, diagnosis) {
        this._id = id
        this._name = name
        this._diagnosis = diagnosis
    }
    get name() {
        return this._name
    }
    get diagnosis() {
        return this._diagnosis
    }
    static readData(file, type, cb) {
        fs.readFile(file, type, cb)
    }
    static writeData(file, data, cb) {
        fs.writeFile(file, data, cb)
    }
    static addPatient(name, diagnosis, cb) {
        fs.readFile('./employee.json', 'utf8', function (err, data) {
            let dataEmployee = JSON.parse(data)
            if (err) {
                throw err
            } else {
                let access = false
                dataEmployee.forEach(function (employee) {
                    if (employee._status && employee._position === 'dokter') {
                        access = true
                    }
                })
                if (access) {
                    fs.readFile('./patient.json', 'utf8', function (err, data) {
                        data = JSON.parse(data)
                        let patient = new Patient(data.length + 1, name, diagnosis)
                        data.push(patient)
                        if (err) {
                            throw err
                        } else {
                            fs.writeFile('./patient.json', JSON.stringify(data, null, 4), function (err) {
                                if (err) {
                                    cb(err)
                                } else {
                                    cb(data, access)
                                }
                            })
                        }
                    })
                } else {
                    cb(data, access)
                }
            }
        })
    }
}

module.exports = Patient