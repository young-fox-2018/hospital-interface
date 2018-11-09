const Controller = require('./controller.js')

const argv = process.argv.slice(2)

switch (argv[0]) {
  case "register":
    let name = argv[1]
    let username = argv[2]
    let password = argv[3]
    let position = argv[4]
    Controller.register(name, username, password, position)
    break;

  case "login":
    let username_Login = argv[1]
    let password_Login = argv[2]
    Controller.login(username_Login, password_Login)
    break;

  case "addPatient":
    let patient_id = argv[1]
    let patient_name = argv[2]
    let patient_diagnosis = argv.slice(3)
    Controller.addPatient(patient_id, patient_name, patient_diagnosis)
    break;

  default:

}

