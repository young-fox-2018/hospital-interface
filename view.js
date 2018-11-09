class View {
    static displayData(err,data){
        console.log(`save data success ${JSON.stringify(data[data.length-1])}. Total employee : ${data.length}`)
    }
    static displayError(err){
        console.log(err)
    }
    static displaylogin(data){
        
        console.log(`user ${data} logged in successfully`)
    }
    static displayaddPatient(Total){
        console.log(`data pasien berhasil ditambahkan. Total data pasien : ${Total}`)

    }
    static displaylogout(data){
        console.log(`${data} sudah logout`)
    }
}
module.exports = View