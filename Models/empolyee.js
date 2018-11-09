const fs = require('fs')

class Employee {
    constructor(name, position, username, password) {
        this._name = name
        this._position = position
        this._username = username
        this._password = password
        this._status = false
    }
    get name() {
        return this._name
    }
    get position() {
        return this._position
    }
    get userame() {
        return this._username
    }
    get password() {
        return this._password
    }
    set password(input) {
        this._password = input
    }
    get status() {
        return this._status
    }
    set status(input) {
        this._status = input
    }

    static readData(file, type, cb) {
        fs.readFile(file, type, cb)
    }
    static writeData(file, data, cb) {
        fs.writeFile(file, data, cb)
    }
    static register(name, position, username, password, cb) {
        Employee.readData('./employee.json', 'utf8', function (err, data) {
            data = JSON.parse(data)
            if (err) {
                throw err
            } else {
                let employee = new Employee(name, position, username, password)
                let countExist = 0
                data.forEach(function (user) {
                    if (username.match(user._username)) {
                        console.log(`Username already exists`)
                        countExist++
                    }
                })
                data.push(employee)
                if (!countExist) {
                    Employee.writeData('./employee.json', JSON.stringify(data, null, 4), function (err) {
                        if (err) {
                            cb(err)
                        } else {
                            cb(data)
                        }
                    })
                }
            }
        })
    }
    static login(username, password, cb) {
        Employee.readData('./employee.json', 'utf8', function (err, data) {
            data = JSON.parse(data)
            if (err) {
                throw err
            } else {
                let countLogInUser = 0
                for (let i = 0; i < data.length; i++) {
                    if (username === data[i]._username && password === data[i]._password) {
                        countLogInUser++
                        if (!data[i]._status) {
                            data[i]._status = true
                            cb(`user ${data[i]._name} logged in successfully`)
                        } else {
                            cb(`you are currently logged in as ${data[i]._username}`)
                        }
                    } else {
                        data[i]._status = false
                    }
                }
                if (countLogInUser === 1) {
                    Employee.writeData('./employee.json', JSON.stringify(data, null, 4), function (err) {
                        if (err) {
                            cb(err)
                        }
                    })
                } else {
                    cb(`invalid username/password`)
                }
            }
        })
    }
    static logout(username, cb) {
        Employee.readData('./employee.json', 'utf8', function (err, data) {
            data = JSON.parse(data)
            if (err) {
                throw err
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (username.match(data[i]._username)) {
                        if (data[i]._status) {
                            data[i]._status = false
                            cb(`user ${data[i]._name} logout successfully`)
                        }
                    }
                }
                Employee.writeData('./employee.json', JSON.stringify(data, null, 4), function (err) {
                    if (err) {
                        cb(err)
                    }
                })
            }
        })
    }
}


module.exports = Employee