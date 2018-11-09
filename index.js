const argv = process.argv
const { Controller } = require("./controller")

switch (argv[2]) {
    case "register":
        Controller.register(argv[3], argv[4], argv[5], argv[6])
        break;
    case "login":
        Controller.login(argv[3], argv[4])
        break;
    case "logout":
        Controller.logout(argv[3])
        break;
        case "addPatient":
        Controller.addPatient(argv[3],argv.slice(4))
        break;
    default:
        break;
}