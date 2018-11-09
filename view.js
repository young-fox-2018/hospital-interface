class View {
  static err(err){
    console.log(err)
  }

  static displayTotal(data){
    console.log(`save data success ${data[data.length-1]}. \n Total employee : ${data.length}`)
    // console.log(`Total employee : ${num}`)
  }


  static login(data) {

    console.log(`user ${data.username} looged in succesfully`)
  }

  static addPatient(data) {
    console.log(`Data pasien berhasil ditambahkan. \nTotal data pasien: ${data.length}`)
  }
}

module.exports = View