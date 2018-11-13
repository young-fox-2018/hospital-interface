class EmployeeView {
    static displayError(err,data){
        if(err === 404) {
            console.log(`username / password wrong`)
        }else if(err === 401) {
            console.log(`tidak memiliki akses untuk add patient`)
        }else if(err === 402) {
            console.log(`anda belum login`)
        }else if(err === 403) {
            console.log(`you already login with account ${data.username}, please logout first`)   
        }else{
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
    static displayLogoutSuccess(data) {
        console.log(`user  ${data.username} has logout`)
    }
    static displaySuccessAddPatient(data) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien:  ${data.length}`)
    }
    static help() {
        console.log(`=== Welcome to Hospital Interface ===
Need help?
[1] 'register': node index.js register username password role
[2] 'login' : node index.js  login username password
case :  error  [403] : You already login with another account
        error  [404] : Username or Password is wrong
ControllerEmployee.login(username, password)
break;
[3] 'addPatient': node index.js addPatient nama_patient sakit_patient
case :  error  [401] : Anda tidak memiliki akses untuk melakukan addPatient
        error  [402] : Anda belum login
[4] 'logout' : node index.js logout
case : error  [402] : Anda belum login
[5] 'help' : node index.js help`)
    }
    
}
module.exports = EmployeeView