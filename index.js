const argv = process.argv.slice(2)
const command = argv[0]

const name = argv[1]
const password = argv[2]
const position = argv[3]

// const id = argv[1]
const namePatient = argv[1]
const diagnosis = argv.slice(2)


const ControllerPatient = require("./Controller/ControllerPatient.js")
const ControllerEmployee = require("./Controller/ControllerEmployee.js")

switch (command) {
    case "register":
        ControllerEmployee.register(name,password,position)
        break;
    case "login":
        ControllerEmployee.login(name,password)
        break;
    case "logout":
        ControllerEmployee.logout(name)
        break;
    case "addPatient":
        ControllerPatient.addPatient(namePatient, diagnosis)
        break;
    default:
        break;
}