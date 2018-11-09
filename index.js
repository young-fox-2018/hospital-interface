// node index.js register budi 12345 dokter (name, password, position)

const argv = process.argv.slice(2)
const Controller  = require("./controller")

switch (argv[0]) {
    case "register":
        // name, passoword, role
        Controller.addEmployee(argv[1], argv[2], argv[3])        
        break;
    case "logout":
        Controller.logout()
        break;
    case "login":
        Controller.login(argv[1], argv[2])
        break;
    case "addpatient":
        Controller.addPatient(argv[1], argv.slice(2))
    default:
        break;
}

