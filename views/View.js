class View {
    static addErr(err) {
        console.log(err)
    }
    static addSuccess() {
        console.log('save data success')
    }

    static loginErr(err) {
        console.log(err)
    }

    static loginSuccess() {
        console.log('user berhasil login');
    }

    static addPatienterr(err){
        console.log(err);
        
    }

    static addPatientSuccess(){
        console.log('data patient berhasil di update')
    }
}

module.exports = View