const Controller = require('./controllers/Controller.js')


const argv = process.argv.slice(2)

let command = argv[0]
let input = argv.slice(1)

switch (command){
    case 'register' : Controller.register(input); break;   
    case 'login' : Controller.login(input); break;
    case 'logout' : Controller.logout(input); break;
    case 'addPatient' : Controller.addPatient(input); break;
}