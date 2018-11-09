class View{
    static displayData(data){
        console.log(data)
    }

    static displayError(err){
        console.log(err)
    }

    static help(){
        console.log(`------------------ HELP MENU------------------------`)
        console.log(`node index.js help`)
        console.log(`node index.js register <username> <password> <position>`)
        console.log(`node index.js login <username> <password>`)
        console.log(`node index.js logout <username>`)
        console.log(`node index.js addPatient <name> <diagnose>`)
    }
}


module.exports = View