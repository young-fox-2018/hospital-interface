const input = process.argv.slice(2)
const Controller = require('./Controllers/Controller')


switch (input[0]) {
    case 'register':
        Controller.register(input[1], input[2], input[3])
        break
    case 'login':
        Controller.login(input[1], input[2])
        break
    case 'logout':
        Controller.logout(input[1])
        break
    case 'addPatient':
        Controller.addPatient(input[1], input.slice(2).join(' '))
        break

    default:
        break
}