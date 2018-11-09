class View {
    static displayErr(err) {
        console.log(err);
    }

    static displayRegister(data, length) {
        console.log(`save data sucess ${data}. Total employee: ${length}`);
    }

    static displayLogin(data) {
        console.log(`user ${data.name} logged in successfully`);
    }

    static displayAddPatient(data, length) {
        console.log(`data pasien berhasil ditambahkan. Total pasien: ${length}`);
    }
}

module.exports = View