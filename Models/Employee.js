class Employee {
    constructor(id, position, username, password) {
      this.id = id;
      this.username = username
      this.password = password
      this.role = position
      this.isLoggedIn = false
    }
  }


module.exports = Employee