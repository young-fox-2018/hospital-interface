const fs = require("fs")

class Model {
    static read(path, callback) {
        fs.readFile(path, "utf8", (err, data) => {
            if (err) callback(err, null)
            else callback(null, data)
        })
    }

    static save(path, data, callback) {
        fs.writeFile(path, JSON.stringify(data), (err, data) => {
            if (err) callback(err, null)
            else {
                let mesage = "Your data has been saved"
                callback(null, mesage)
            }
        })
    }

}

module.exports = Model