

class Views {
    static display(data) {
        console.log(data)
    }
    static displayLogin(input){
        console.log(`user ${input.name} logged in successfully`)
    }

    static displayFindAll(inputData) {
        console.log(inputData)
    }

    static displayPatient(patientData) {
        console.log(`${patientData}`)
    }
}

module.exports = Views