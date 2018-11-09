const FileSystem = require('./FileSystem');

class Employee {
    constructor(id, name, position, username, password) {
        this.id = id
        this.name = name
        this.position = position
        this.username = username
        this.password = password
        this.login = false
    }

    static readDataEmployee(callback) {
        FileSystem.readFile('./data-employees.json', (err, data) => {
            if (err) callback(err)
            else callback(null, data)
        })
    }

    static login(obj, callback) {
        FileSystem.readFile('./data-employees.json', (err, data) => {
            if (err) callback(err)
            else {
                let dataEmployee = data
                dataEmployee.forEach((employee, index) => {
                    if (obj.username === employee.username && obj.password == employee.password) {
                        let dataUser = {
                            id: employee.id,
                            name: employee.name,
                            position: employee.position,
                            username: employee.username,
                            password: employee.password,
                            login: true
                        }
                        dataEmployee.splice(index, 1, dataUser)
                        FileSystem.writeFile('./data-employees.json',dataEmployee, (err) => {
                            if (err) callback(err)
                            else {
                                callback(null, data)
                            }
                        })
                    }
                });
            }
        })
    }
    addDataEmployee(callback) {
        FileSystem.readFile('./data-employees.json', (err, data) => {
            if (err) callback(err)
            else {
                let dataEmployee = data
                let obj = {
                    id: dataEmployee.length,
                    name: this.name,
                    position: this.position,
                    username: this.username,
                    password: this.password,
                    login: this.login
                }
                dataEmployee.push(obj)
                FileSystem.writeFile('./data-employees.json', dataEmployee, err => {
                    if (err) callback(err)
                    else {
                        callback(null,data)
                    }
                })
            }
        })
    }

}

module.exports = Employee