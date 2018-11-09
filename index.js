"use strict"

const Controller = require('./controller/Controller')
const argv = process.argv.slice(2)

function inputHospitalCommand() {
    let obj = {}
    switch(argv[0]) {
        case 'register':
            obj = {
                username : argv[1],
                password : argv[2],
                role : argv[3]
            }

            Controller.register(obj)
        break
        case 'login':
            obj = {
                username : argv[1],
                password : argv[2],
            }

            Controller.login(obj)
        break   
        case 'addPatient':
            let diseases = ''

            for (let i = 3; i < argv.length; i++) {
                diseases += argv[i] + ' '
            }
            
            diseases = diseases.trim()

            obj = {
                id: argv[1],
                name : argv[2],
                diagnosis : diseases
            }
                
            Controller.addPatient(obj)
    }            
}


inputHospitalCommand()