const argv = process.argv.slice(2)
const Controller = require("./controller")

let command = argv[0]
let option = argv.slice(1)

switch (command) {

    case "listEmployees":
        Controller.list()
        break;

    case "register":
        Controller.register({"username" : option[0], "password" : option[1], "role" : option[2]})
        break;

    case "login":
        Controller.login({"username" : option[0], "password" : option[1]})
        break;

    case "addPatient":
        Controller.addPatient({"id" : option[0], "name" : option[1], "diagnosis" : option.slice(2).join(" ")})
        break;

    default:
        break;
}