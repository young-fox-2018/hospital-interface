const fs = require('fs')

class FileSystem {
    static readData(path, callback) {
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) callback(err, null)
            else callback(null, JSON.parse(data))
        })
    }

    static writeData(path, newData, callback) {
        fs.writeFile(path, JSON.stringify(newData, null, 4), function(err) {
            if (err) callback(err)
            else callback(null)
        })
    }
}

module.exports = FileSystem