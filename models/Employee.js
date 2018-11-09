const fs = require('fs')

class Employee {
  constructor(employee) {
    this.id = employee.id
    this.name = employee.name
    this.position = employee.position
    this.username = employee.username
    this.password = employee.password
    this.loggedIn = employee.loggedIn
  }

  static readData(file, cb) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        cb(err);
      } else {
        cb(null, JSON.parse(data));
      }
    })
  }

  static writeData(file, data, cb) {
    fs.writeFile(file, JSON.stringify(data, null, 2), function(err) {
      if (err) {
        cb(err);
      } else {
        cb(null)
      }
    })
  }

  static register(username, password, position, cb) {
    Employee.readData('./employee.json', function(err, data) {
      if (err) {
        cb({message: 'read data err', err: err})
      } else {
        let obj = {
          id: data.length+1,
          name: username,
          position: position, 
          username: username,
          password: password,
          loggedIn: false
        }
        let newData = data;
        newData.push(new Employee(obj));
        Employee.writeData('./employee.json', newData, function(err) {
          if (err) {
            cb({message: 'write data err', err: err})
          } else {
            cb(null, obj, newData.length)
          }
        })
      }
    })
  }

  static findOne(name, cb) {
    Employee.readData('./employee.json',function(err, data) {
      if (err) {
        cb({message: 'read data err', err: err});
      } else {
        let find = false;
        for (var i = 0; i < data.length; i++) {
          if (data[i].name === name) {
            find = true;
            break;
          }
        }
        if (find === true) {
          cb(null, data[i], i);
        } else {
          cb('username tidak ditenukan')
        }
      }
    })
  }
  
  static login(username, password, cb) {
    Employee.readData('./employee.json', function(err, data) {
      if (err) {
        cb({message: 'read data err', err: err});
      } else {
        let cekLoggedIn = false;
        for (let i = 0; i < data.length; i++) {
          if (data[i].loggedIn === true) {
            cekLoggedIn = true
            break;
          }
        }
        if (cekLoggedIn === true) {
          cb('user tidak bisa login')
        } else {
          let newData = data;
          Employee.findOne(username, function(err, data, index) {
            if (err) {
              cb('username / password wrong')
            } else {
              if (data.password === password) {
                newData[index].loggedIn = true;
                Employee.writeData('./employee.json', newData, function(err) {
                  if (err) {
                    cb({message: 'write data err', err: err})
                  } else {
                    cb(null, data)
                  }
                })
              }
            }
          })
        }
      }
    })
  }
}

module.exports = Employee