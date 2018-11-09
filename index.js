const Controller = require('./Controller/Controller')
const argv = process.argv.slice(2)
const command = argv[0]
const option = argv.slice(1)

switch (command) {
    case 'register':
        Controller.register(option)
        break;

    case 'login':
        Controller.login(option)

    case 'addPatient':
        Controller.addPatient(option)

    case 'logout':
        Controller.logout(option)

    default:
        break;
}
