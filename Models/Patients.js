const fs = require('fs')
const path = './database/patients.json'

class Patients {
    constructor(id, name, diagnosa) {
        this.id = id
        this.name = name
        this.diagnosa = diagnosa
    }
    static readDataPatient(path, callback) {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, JSON.parse(data))
            }
        })
    }
    static save(path, data, callback) {
        fs.writeFile(path, JSON.stringify(data, null, 4), (err) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null)
            }
        })
    }
}

module.exports = Patients