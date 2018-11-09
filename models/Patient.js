const fs = require('fs')

class Patient {
    // constructor(id, name, diagnosis) {
    //   this.id = id
    //   this.name = name
    //   this.diagnosis = diagnosis
    // }

    static readFile(path, cb) {
        fs.readFile(path, 'utf8', function(err, data) {
            if(err) cb(err)
            else cb(null, JSON.parse(data))
        })
    }

    static writeFile(path, value, cb){
        let data = JSON.stringify(value, null, 4)
        fs.writeFile(path, data, function(err) {
            if(err) cb(err)
            else cb(null, data)
        })
    }

    static addPatient(name, diagnosa, cb){
        Patient.readFile('./employees.json', function (err, data) {
            if(err) cb(err)
            else{
                let dokterLogged = false
                data.forEach( (item, index) => {
                    if(item.role === "dokter" && item.logged === true) {
                        dokterLogged = true
                        Patient.readFile('./patients.json', function(err, data){
                            if(err) cb(err)
                            else{
                                let obj = {}

                                if(data.length === 0) obj.id = 1
                                else obj.id = data[data.length-1].id + 1

                                obj.name = name
                                obj.diagnosa = diagnosa

                                data.push(obj)
                                Patient.writeFile('./patients.json', data, function(err){
                                    if(err) cb(err)
                                    else cb(null, data)
                                })
                            }
                        })
                    }
                })
                if(dokterLogged === false) cb("tidak memiliki akses untuk add patient")
            }
        })
    }

}

module.exports = Patient