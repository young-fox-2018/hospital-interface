const argv = process.argv.slice(2);
const Controller = require('./controllers/Controller');

switch (argv[0]) {
    case undefined: Controller.help(); break;
    case 'help': Controller.help(); break;
    case 'listEmployee': Controller.listEmployee(); break;
    case 'register': Controller.register(argv.slice(1)); break;
    case 'login': Controller.login(argv.slice(1)); break;
    case 'logout' : Controller.logout(); break;
    case 'addPatient': Controller.addPatient(argv.slice(1)); break;
    default: Controller.wrongCommand(); break;
}