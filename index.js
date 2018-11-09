const argv = process.argv.slice(2)
const Controller = require('./controllers/Controller')

let username = argv[1];
let password = argv[2];
let position = argv[3];

switch (argv[0]) {
    case 'register':
        Controller.regiser(username, password, position);
        break;

    case 'login':
        Controller.login(username, password);
        break;

    case 'addPatient':
        let id = argv[1]
        let name = argv[2]
        let diagnosis = argv.slice(3)
        Controller.addPatient(id, name, diagnosis);

    default:
        break;
}