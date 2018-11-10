const ControllerEmployee = require('./controllers/ControllerEmployee')

const argv = process.argv.slice(2)

let username = argv[1]
let password = argv[2]
let role = argv[3]

let id_patient = argv[1]
let nama_patient = argv[2]
let sakit_patient = argv.slice(3)

// console.log(sakit_patient)

switch (argv[0]) {
    case 'register':
        ControllerEmployee.register(username, password, role)
        break;
    case 'login' :
        ControllerEmployee.login(username, password)
        break;
    case 'addPatient':
        ControllerEmployee.addPatient(id_patient, nama_patient, sakit_patient)
        break;
    case 'logout' :
        ControllerEmployee.logout()
        break;
    default:
        ControllerEmployee.help()
        break;
}