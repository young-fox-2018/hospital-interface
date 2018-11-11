const argv = process.argv
const Controller = require('./Controllers/controller')

const cmd = argv.slice(2)
const input = cmd.slice(1)
// console.log(cmd[0],"+++")
Controller.execute(cmd[0],input)
