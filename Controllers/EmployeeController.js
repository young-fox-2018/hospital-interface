const Employee = require('../Models/Employee');
const View = require('../Views/Employee')
class EmployeeController {
    static readDataEmployee() {
        Employee.readDataEmployee((err, data) => {
            if (err) View.err(err)
            else View.printLine(data)
        })
    }

    static addEmployee(name, position, password) {
        let data = new Employee(null, name, position, name, password);
        data.addDataEmployee(function (err, data) {
            if (err) View.err(err)
            else {
                View.printLine(`${name} has been registered`)
            }
        })
    }
    static login(username, password) {
        let obj = {
            username: username,
            password: password
        }
        Employee.login(obj, (err, data) => {
            if (err) View.err(err)
            else View.printLine(data)
        })
    }
}

module.exports = EmployeeController