const EmployeeController = require('./controllers/EmployeeController')
const PatientController = require('./controllers/PatientController')
const argv = process.argv.slice(2)

let command = argv[0]
let param = argv.slice(1)

switch (command) {
    case 'register':
        EmployeeController.registerEmp(param)
        break;
    case 'login' : 
        EmployeeController.loginEmp(param)
        break;
    case 'addPatient':
        PatientController.addPatient(param)
        break;
    case 'logout':
        EmployeeController.logoutEmp()
        break;
    case 'findOne':
        EmployeeController.findOne(param)
        break
    default:
        EmployeeController.help()
        break;
}


