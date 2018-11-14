class View {
    static addErr(err) {
        console.log(err)
    }
    static addSuccess(newEmployee, total) {
        console.log(`Save data success ${JSON.stringify(newEmployee)}. Total employee: ${total}`)
    }

    static loginErr(err) {
        console.log(err)
    }

    static loginSuccess(name) {
        console.log(`user ${name} berhasil login`);
    }

    static addPatienterr(err){
        console.log(err);
    }

    static addPatientSuccess(total){
        console.log(`Data patient berhasil di update. Total Patient: ${total}`)
    }

    static patientStatusErr(err) {
        console.log(err);
    }

    static patientStatusSuccess(err) {
        console.log('satus pasien berhasil di update');
    }

    static logoutErr(err) {
        console.log(err);
    }

    static logoutSuccess() {
        console.log('user berhasil logout');
    }
}

module.exports = View