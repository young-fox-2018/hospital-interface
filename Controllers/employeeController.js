const Model = require('../Models/empolyee')
const View = require('../Views/view')

class EmployeeController {
    static register(name, position, username, password) {
        Model.register(name, position, username, password, function (data) {
            View.showRegisterEmployee(data)
        })
    }
    static login(username, password) {
        Model.login(username, password, function (input) {
            View.showLoginEmployee(input)
        })
    }
    static logout(username) {
        Model.logout(username, function (input) {
            View.showLogoutEmployee(input)
        })
    }
}

module.exports = EmployeeController