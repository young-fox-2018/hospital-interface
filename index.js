const argv = process.argv.slice(2);
const Controller = require('./controllers/Controller');

switch (argv[0]) {
    case undefined: Controller.help(); break;
    case 'help': Controller.help(); break;
    case 'listEmployee': Controller.listEmployee(); break;
    case 'register': Controller.register(argv.slice(1)); break;
    default:
        break;
}

// console.log(argv);