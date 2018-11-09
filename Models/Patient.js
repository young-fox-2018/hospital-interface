const FileSystem = require('./FileSystem');

class Patient {
    constructor(id, name, diagnosis) {
        this.id = id
        this.name = name
        this.diagnosis = diagnosis
    }

    static cekUser(callback) {
        FileSystem.readFile('./data-employees.json', (err, data) => {
            if (err) callback(err)
            else {
                let dataEmployees = data
                let dokter = false
                dataEmployees.forEach(employee => {
                    if (employee.login === true && employee.position === 'dokter') {
                        dokter = true
                    }

                });
                if (dokter) {
                    callback(null, [])
                } else {
                    callback(null, null)
                }
            }
        })
    }

    addPatient(callback) {
        FileSystem.readFile('./data-patients.json', (err, data) => {
            if (err) throw err
            else {
                //console.log(this.id, this.name, this.diagnosis)
                let dataPatients = data
                let objPatient = {
                    id : this.id,
                    name : this.name,
                    diagnosis : this.diagnosis
                }
                dataPatients.push(objPatient)
                FileSystem.writeFile('./data-patients.json', dataPatients, err => {
                    if (err) callback(err)
                    else callback(null)
                })
            }
        })
    }
}

module.exports = Patient