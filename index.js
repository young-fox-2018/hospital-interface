const argv = process.argv.slice(2)
const Controller = require("./controllers/controller")
switch (argv[0]) {
    case "help":
        Controller.help()
        break;
    case "register":
        let data = argv.slice(1)
        Controller.register(data)
        break;
    case "login":
        Controller.login(argv[1], argv[2])
        break;
    case "logout":
        Controller.logout(argv[1])
        break;
    case "addPatient":
        let diagnosis = argv.slice(2)
        Controller.addPatient(argv[1], diagnosis)
        break;
    default:
        break;
}