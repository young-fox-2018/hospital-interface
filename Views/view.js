
class View {
    static showRegisterEmployee(input) {
        console.log(`Save Data ${input[input.length - 1].name} Success. Total employee: ${input.length}`)
    }
    static showLoginEmployee(input) {
        console.log(input)
    }
    static showRegisterPatient(input, access) {
        if (access) {
            console.log(`Save Data ${input[input.length - 1].name} Success. Total Patient: ${input.length}`)
        } else {
            console.log(`access denied, only doctor can access this feature!`)
        }
    }
    static showLogoutEmployee(input) {
        console.log(input)
    }
}

module.exports = View