class EmployeeView {
    static displayError(err){
        if(err === 404) {
            console.log(`username / password wrong`)
        }else if(err === 401) {
            console.log(`tidak memiliki akses untuk add patient`)
        }else if(err === 402) {
            console.log(`anda belum login`)
        }
        else{
            console.log({
                message : err
            })
        }
    }
    static displayRegisterSuccess(newData, data) {
        console.log(`save data success ${newData}. Total Employee : ${data.length}`)
    }
    static displayLoginSuccess(username) {
        console.log(`user ${username} logged in succesfully`)
    }
    static displaySuccessAddPatient(data) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien:  ${data.length}`)
    }
    
}
module.exports = EmployeeView