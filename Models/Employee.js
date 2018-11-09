const fs = require('fs')
const path = './database/employee.json'
const pathPatients = './database/patients.json'
const Patients = require('./Patients')


class Employee {
    constructor(id, username, password) {
        this.id = id
        this.username = username
        this.password = password
        this.status = false
    }
    static readData(path, callback) {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) callback(err, null)
            else callback(null, JSON.parse(data))
        })
    }
    static save(path, data, callback) {
        fs.writeFile(path, JSON.stringify(data, null, 4), (err) => {
            if (err) callback(err)
            else callback(null)
        })
    }
    static register(username, password, role, callback) {
        Employee.readData(path, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                let dataEmployee = data
                let id = 0
                if (dataEmployee.length === 0) {
                    id = 1
                } else {
                    id = dataEmployee[dataEmployee.length - 1].id + 1
                }
                let newEmployee
                if (role === 'dokter') {
                    newEmployee = new Dokter(id, username, password)
                } else if (role === 'officeboy') {
                    newEmployee = new Officeboy(id, username, password)
                } else if (role === 'admin') {
                    newEmployee = new Admin(id, username, password)
                } else if (role === 'recepcionist') {
                    newEmployee = new Recepcionist(id, username, password)
                }
                dataEmployee.push(newEmployee)
                Employee.save(path, dataEmployee, (err, data) => {
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(null, `Save data succes {"username":"${username}","password":"${password}", "role":"${role}"}. Total employee : ${dataEmployee.length}`)
                    }
                })
            }
        })
    }
    static login(username, password, callback) {
        Employee.readData(path, (err, data) => {
            if (err) {
                callback(err)
            } else {
                let dataEmployee = data
                const idxLogin = dataEmployee.findIndex(employee => employee.status === true)
                if (idxLogin !== -1) {
                    callback(`There is other employee logged in!`)
                } else {
                    const index = dataEmployee.findIndex(employee => employee.username === username && employee.password === password)
                    if (index === -1) {
                        callback(`Username / password wrong!`)
                    } else {
                        dataEmployee[index].status = true
                        Employee.save(path, dataEmployee, (err, data) => {
                            if (err) {
                                callback(err, null)
                            } else {
                                callback(null, `User ${username} logged in succesfully`)
                            }
                        })
                    }
                }
            }
        })
    }
    static logout(username, callback) {
        Employee.readData(path, (err, data) => {
            if (err) {
                callback(err)
            } else {
                let dataEmployee = data
                const index = dataEmployee.findIndex(employee => employee.username === username && employee.status === true)
                if (index === -1) {
                    callback(`User ${username} is not logged in now!`)
                } else {
                    dataEmployee[index].status = false
                    Employee.save(path, dataEmployee, (err, data) => {
                        if (err) {
                            callback(err, null)
                        } else {
                            callback(null, `User ${username} has been logged out succesfully`)
                        }
                    })
                }
            }
        })
    }
    static addPatient(name, diagnosa, callback) {
        Employee.readData(path, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                let dataEmployee = data
                let isDokter = false
                dataEmployee.forEach(employee => {
                    if (employee.status === true && employee.role === 'dokter') {
                        isDokter = true
                    }
                })
                if (isDokter === false) {
                    callback(`You dont have acces to add patient!`)
                } else {
                    Patients.readDataPatient(pathPatients, (err, data) => {
                        if (err) {
                            callback(err, null)
                        } else {
                            let dataPatients = data,
                                id = 0
                            if (dataPatients.length === 0) id = 1
                            else id = dataPatients[dataPatients.length - 1].id + 1
                            let newPatient = new Patients(id, name, diagnosa)
                            dataPatients.push(newPatient)
                            Patients.save(pathPatients, dataPatients, (err) => {
                                if (err) {
                                    callback(err, null)
                                } else {
                                    callback(null, `Data pasien berhasil ditambahkan. Total data pasien : ${dataPatients.length}`)
                                }
                            })

                        }
                    })
                }
            }
        })
    }
}

class Officeboy extends Employee {
    constructor(id, username, password) {
        super(id, username, password)
        this.role = 'office boy'
    }
}
class Dokter extends Employee {
    constructor(id, username, password) {
        super(id, username, password)
        this.role = 'dokter'
    }
}
class Recepcionist extends Employee {
    constructor(id, username, password) {
        super(id, username, password)
        this.role = 'recepcionist'
    }
}
class Admin extends Employee {
    constructor(id, username, password) {
        super(id, username, password)
        this.role = 'admin'
    }
}

module.exports = {
    Employee: Employee,
    Officeboy: Officeboy,
    Dokter: Dokter,
    Recepcionist: Recepcionist,
    Admin: Admin
}