const Controller = require('./controller.js')
const argv = process.argv.slice(2)
const command = argv[0]
const option = argv.slice(1)

switch (command) {
    case "register": 
    Controller.registerEmployee(option)
    break;
    case "login":
    Controller.login(option)
    break;
    case "addPatient":
    Controller.addPatient(option)
    break;
    case "logout":
    Controller.logout(option);
    break;
    default:
        break;
}