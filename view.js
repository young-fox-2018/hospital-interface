class View {
  static viewData(data) {
    return console.log(data);
  }

  static viewDataRegister(data) {
    if (data === "username sudah terpakai, harap ganti yang lain") {
      return console.log(`username sudah terpakai, harap ganti yang lain`);
    }
    else {
      return console.log(`save data success ${JSON.stringify(data[data.length-1])}. Total employee : ${data.length}`);
    }
  }

  static viewDataLogin(data) {
    if (data === "username / password wrong") {
      return console.log(`username / password wrong`);
    }
    else if (data === "masih ada user yang login") {
      return console.log(`masih ada user yang login`);
    }
    else {
      return console.log(`user ${data.username} logged successfully`);
    }
  }

  static viewDataAddPatient(data) {
    if (data === "silahkan login sebagai dokter untuk menambah pasien") {
      return console.log(`silahkan login sebagai dokter untuk menambah pasien`);
    }
    else {
      return console.log(`data pasien berhasil ditambahkan. Total data pasien ${data.length}`);
    }
  }

}

module.exports = View