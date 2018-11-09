
class View {
    static printLine(input) { console.log(input) }
    static printData(data){
        data.forEach(element => {
            console.log(element)
        });
    }
    
}
module.exports = { View: View }