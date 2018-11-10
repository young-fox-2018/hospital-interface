const argv = process.argv.slice(2)
const Controller = require('./controllers/employee')

switch (argv[0]) {
    case 'register':
        Controller.register(argv[1], argv[2], argv[3]) // anyone
        break
    case 'findAll':
        Controller.findAll() // admin and dokter
        break
    case 'update':
        Controller.updateData(argv[1], argv[2]) // anyone
        break
    case 'deleteMyAccount':
        Controller.deleteEmployee() // anyone
        break
    case 'login':
        Controller.employeeLogin(argv[1], argv[2]) // anyone
        break
    case 'logout':
        Controller.employeeLogout() // anyone
        break
    case 'addPatient':
        Controller.addPatient(argv[1], argv[2]) // dokter only
        break   
    case 'findAllPatient':
        Controller.findAllPatients() //admin and dokter
        break
    case 'updatePatient':
        Controller.updatePatient(argv[1], argv[2], argv[3]) // dokter only (patient id, field, new value)
        break  
    case 'deletePatient':
        Controller.deletePatient(argv[1], argv[2]) // dokter only (patient id, patient name)
        break
}