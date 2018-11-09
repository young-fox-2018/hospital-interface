const Controller  = require ('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-2/day-5/hospital-interface/Controllers/Controller.js')
const input       = process.argv.slice(2)

// Controller.hello(input)
switch (input[0]){
  case 'register' :
  Controller.register(input[1],input[2],input[3],input[4])
    break
  case 'login'    :
  Controller.login(input[1],input[2])
  // console.log('masuk index',input[1],input[2])
  break
      // case ''
}
