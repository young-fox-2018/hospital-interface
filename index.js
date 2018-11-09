const argv = process.argv
const EmployeeController = require('./Controllers/employeeController')
const PatientController = require('./Controllers/patientController')

switch (argv[2]) {
    case 'register':
        EmployeeController.register(argv[3], argv[4], argv[5], argv[6])
        break;
    case 'login':
        EmployeeController.login(argv[3], argv[4])
        break;
    case 'addPatient':
        PatientController.addPatient(argv[3], argv[4])
        break;
    case 'logout':
        EmployeeController.logout(argv[3])
        break;
}