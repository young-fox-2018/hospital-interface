const fs = require('fs')

class FileSystem {
    static readFile(path, callback) {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) callback(err)
            else callback(null, JSON.parse(data))
        })
    }

    static writeFile(path, data, callback) {
        fs.writeFile(path, JSON.stringify(data, null, 2), err => {
            if (err) callback(err)
            else callback(null)
        })
    }
}

module.exports = FileSystem