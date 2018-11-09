const Employee = require('./Controllers/EmployeeController')
const Patient = require('./Controllers/PatientController')
const argv = process.argv.slice(2)

switch (argv[0]) {
    case 'register':
        Employee.addEmployee(argv[1], argv[2], argv[3])
        break;
    case 'login':
        Employee.login(argv[1], argv[2])
        break;
    case 'addPatient':
        let diagnosis = argv.slice(3)
        Patient.addPatient(argv[1], argv[2], diagnosis.join(' '))
        break;
    default:
        break;
}