class View {
  static viewData(data) {
    return console.log(data);
  }

  static viewDataRegister(data) {
    return console.log(`save data success ${JSON.stringify(data[data.length-1])}. Total employee : ${data.length}`);
  }

  static viewDataLogin(data) {
    if (typeof data === String) {
      return console.log(`masih ada user yang login`);
    }
    else {
      return console.log(`user ${data.username} logged successfully`);
    }
  }

  static viewDataAddPatient(data) {
    return console.log(`data pasien berhasil ditambahkan. Total data pasien ${data.length}`);
  }

}

module.exports = View