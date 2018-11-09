
const controller = require("./Controller/controller");
const args = process.argv.slice(2);

let command = args[0];
let name = args[1];
let position = args[2];
let username = args[3];
let password = args[4];
// let password = args[5];
// name, position, username, password
// controller.cases(command, name, position, username, password);

switch (command) {
    case "register":
        controller.register(name, username, password, position)
        break;
    case "findall":
        controller.findAll()
    break; 
    case "login" : 
        controller.login(username, password)
    break; 
    default:
        break;
}

