class View{
    static help(){
        console.log("Please put a proper command")
    }
    static display(data){
        console.log(data)
    }
    static displayError(err){
        console.log("ERROR!")
        console.log(err)
    }
}
module.exports = View