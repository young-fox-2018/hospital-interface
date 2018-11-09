const util = require("util")

class View{

    static showError(err){
        console.log('------error-----')
        console.log(err)
    }

    static showData(value){
        console.log(value)
    }

    static showList(data){
        data.forEach(item => {
            console.log(item)
        })
    }
}

module.exports = View