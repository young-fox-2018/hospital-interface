class View {
    static displayError(err) {
        console.log('ERROR:')
        console.log(err)
    }

    static displayData(data) {
        console.log('DATA:')
        console.log(data)
    }

    static displayNotification(message) {
        console.log(message)
    }

    static displayRegister(username, password, role, data) {
        console.log(`Register success {username: ${username}, password: ${password}, role: ${role}}. Total employee: ${data.length}`)
    }


    static displayFindAll(data) {
        data.forEach(element => {
            console.log(`${element._id}. ${element._username} --- ${element._role}`)
        });
    }

    static displayUpdate(key, newValue) {
        console.log(`You successfully updated ${key} as ${newValue}`)
    }

    static displayDelete() {
        console.log(`Your account deleted successfully`)
    }

    static displayLogin(username) {
        console.log(`User ${username} logged in successfully`)
    }

    static displayLogout() {
        console.log(`You are logged out successfully`)
    }

    static displayAddPatient() {
        console.log('New patient added successfully')
    }

    static displayFindAllPatients(data) {
        data.forEach(element => {
            console.log(`${element._id}. ${element._name} --- ${element._diagnosis}`)
        });
    }

    static displayUpdatePatient(id, field, newValue) {
        console.log(`You have updated patient id ${id} ${field} as ${newValue}`)
    }

    static displayDeletePatient(id, name) {
        console.log(`Patietn {id: ${id}, name: ${name}} deleted successfully`)
    }
}

module.exports = View