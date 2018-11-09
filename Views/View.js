class View {

    static registerData (data, newData) {
        console.log(`save data success ${newData}. Total employee : ${data.length}`)
    }

    static erorDisplay (err) {
        console.log(err)
    }

    static loginInfo (data) {
        console.log(`user ${data} logged in successfully`)
    }

    static addPatientInfo (data) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien : ${data.length}`)
    }

    static logoutInfo (data) {
        console.log(`${data} berhasil logout!`)
    }

}

module.exports = View