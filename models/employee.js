const help = require("../command/command")
const Model = require("./model")
const dbEmployee = "./database/employee.json"

class Employee extends Model {
    constructor(name, position, username, password) {
        super()
        this.id = null
        this.name = name
        this.position = position
        this.username = username
        this.password = password
        this.status = false
    }
    static help() {
        return help
    }

    static register(data, callback) {
        let newData = Employee.role(data)
        if (newData === false) {
            callback(`Role not Registered `)
        }
        else {
            Employee.generateId((err, data) => {
                if (err) callback(err, null)
                else {
                    newData.id = data
                    Employee.read(dbEmployee, (err, data) => {
                        if (err) callback(err, null)
                        else {

                            let employeeData = JSON.parse(data)
                            let isUsername = false
                            for (let i = 0; i < employeeData.length; i++) {
                                if (employeeData[i].username === newData.username) {
                                    isUsername = true
                                }
                            }

                            if (isUsername === false) {
                                employeeData.push(newData)
                                Employee.save(dbEmployee, employeeData, (err, data) => {
                                    if (err) {
                                        callback(err, null)
                                    }
                                    else {
                                        callback(null, employeeData)
                                    }
                                })
                            }

                            else {
                                callback("username already exist")
                            }
                        }
                    })
                }
            })
        }
    }

    static login(username, password, callback) {
        Employee.read(dbEmployee, (err, data) => {
            if (err) callback(err, null)
            else {
                let employeeData = JSON.parse(data)
                let isLogin = false
                let index = 0

                for (let i = 0; i < employeeData.length; i++) {
                    if (employeeData[i].username === username && employeeData[i].password === password && employeeData[i].status === false) {
                        isLogin = true
                        index = i
                    }
                    else if (employeeData[i].username === username && employeeData[i].password === password && employeeData[i].status === true) {
                        isLogin = true
                        index = -1
                    }
                }

                if (isLogin === true && index !== -1) {
                    employeeData[index].status = true
                    Employee.save(dbEmployee, employeeData, (err, data) => {
                        if (err) callback(err, null)
                        else callback(null)
                    })
                }
                else if (isLogin === true && index === -1) {
                    callback("You already log in")
                }
                else {
                    callback("your password/username wrong")
                }
            }
        })
    }

    static logout(username, callback) {
        Employee.read(dbEmployee, (err, data) => {
            if (err) callback(err, null)
            else {
                let employeeData = JSON.parse(data)
                let isLogin = false
                let index = 0

                for (let i = 0; i < employeeData.length; i++) {
                    if (employeeData[i].username === username && employeeData[i].status === true) {
                        isLogin = true
                        index = i
                    }
                    else if (employeeData[i].username === username && employeeData[i].status === false) {
                        isLogin = true
                        index = -1
                    }
                }

                if (isLogin === true && index !== -1) {
                    employeeData[index].status = false
                    Employee.save(dbEmployee, employeeData, (err, data) => {
                        if (err) callback(err)
                        else callback(null)
                    })
                }
                else if (isLogin === true && index === -1) {
                    callback("Login first")
                }
                else {
                    callback("your username wrong")
                }


            }
        })
    }


    static generateId(callback) {
        Employee.read(dbEmployee, (err, data) => {
            if (err) callback(err)
            else {
                let dataEmployee = JSON.parse(data)
                if (dataEmployee.length === 0) {
                    callback(null, 1)
                }
                else {
                    callback(null, (Number(dataEmployee[dataEmployee.length - 1].id) + 1))
                }
            }
        })
    }

    static role(data) {
        if (data[1] === "admin") {
            return new Admin(data[0], data[1], data[2], data[3])
        }
        if (data[1] === "officeboy") {
            return new OfficeBoy(data[0], data[1], data[2], data[3])
        }
        if (data[1] === "receptionis") {
            return new Receptionis(data[0], data[1], data[2], data[3])
        }
        if (data[1] === "docter") {
            return new Docter(data[0], data[1], data[2], data[3])
        }
        else {
            return false
        }

    }
}

class Admin extends Employee {
    constructor(name, position, username, password) {
        super(name, "Admin", username, password)
    }
}

class OfficeBoy extends Employee {
    constructor(name, position, username, password) {
        super(name, "OfficeBoy", username, password)
    }

}
class Receptionis extends Employee {
    constructor(name, position, username, password) {
        super(name, "Receptionis", username, password)
    }

}
class Docter extends Employee {
    constructor(name, position, username, password) {
        super(name, "Docter", username, password)
    }

}

module.exports = Employee

