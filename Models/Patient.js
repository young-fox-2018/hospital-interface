
const fs = require("fs");
const View = require("../Views/view")

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readFile() {
    // fs.readFile("employee.json", "utf8", )
  }

  static writeFile() {
    
  }
}

module.exports = Patient
