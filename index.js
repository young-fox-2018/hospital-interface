
const controller = require("./Controller/controller");
const args = process.argv.slice(2);

let command = args[0];
// let name = args[1];
// let position = args[2];
// let username = args[3];
// let password = args[4];

switch (command) {
    case "register":
        controller.register(args[1], args[2], args[3], args[4])
        break;
    case "findAll":
        controller.findAll()
    break; 
    case "login" : 
        controller.login(args[1], args[2])
    break; 
    case "addPatient" :
        controller.addPatient(args[1], args[2], args[3])
    default: "How can we help you?"
        break;
}

