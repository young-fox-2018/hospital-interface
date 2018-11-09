class View {
    static printError(err) {
        console.log(`ERROR: ${err}`)
    }

    static addEmployee(input) { // receive all of employee data
        console.log(`Save data sucess`)
        console.log(`Username: ${input[input.length-1].name}`)
        console.log(`Password: ${input[input.length-1].password}`)
        console.log(`Role: ${input[input.length-1].position}`)
        console.log(`Total Employee : ${input.length}`)
    }

    static addPatient(input) {
        console.log(`Doctor ${input[input.length-1].doctors} has added new patient`)
        console.log(`Patient Name: ${input[input.length-1].name}`)
        console.log(`Diagnosis:`)
        input[input.length-1].diagnosis.forEach(element => {
            console.log(element)
        });
    }  

    static printLine(input) {
        console.log(input)
    }

    static printMessage(data, message) {
        console.log(`User ${data.username} ${message} `)
    }

    
}

module.exports = View