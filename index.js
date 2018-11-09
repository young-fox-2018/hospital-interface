const Controller = require('/Users/zhang/phase1/p1w2/hospital-interface/controller.js')
const command = process.argv[2]

const info = process.argv.slice(3)

switch (command) {
  case 'register': Controller.register(info) ; break;
  case 'login' : Controller.login(info) ; break;
  case 'addPatient' : Controller.addPatient(info) ; break;
  default: console.log(`COMMAND INVALID`) ; break;
}

// console.log(command)