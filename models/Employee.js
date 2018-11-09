const fs = require('fs')

class Employee {
    // constructor(username, password, role) {
    //   this.position = position
    //   this.username = username
    //   this.password = password
    //   this.role = role
    // }

    static readFile (cb) {
        fs.readFile('./employees.json', 'utf8', function(err, data) {
            if(err) cb(err)
            else cb(null, JSON.parse(data))
        })
    }

    static writeFile (value, cb) {
        let data = JSON.stringify(value, null, 4)
        fs.writeFile('./employees.json', data, function(err) {
            if(err) cb(err)
            else cb(null)
        })
    }

    static register (username, password, role, cb) {
        Employee.readFile (function (err, data) {
            if(err) cb(err)
            else{
                let obj = {}
                obj.username = username
                obj.password = password
                obj.role = role
                obj.logged = false

                let originalData = data
                originalData.push(obj)
                Employee.writeFile(originalData, function(err){
                    if (err) cb(err)
                    else cb(null, originalData)
                })
            }
        })
    }

    static login (username, password, cb) {
        Employee.readFile (function(err, data) {
            if (err) cb(err)
            else{
                let othersLogin = false
                data.forEach(item => {
                    if(item.logged === true && item.username !== username) othersLogin = true
                })
                if(othersLogin === true) cb(null, "Other person is currently login, please logged out first")
                else{
                    let isThere = false
                    data.forEach( item => {
                        if (item.username === username && item.password === password) {
                            item.logged = true
                            isThere = true
                        }
                    })

                    if(isThere === true){
                        Employee.writeFile(data, function(err){
                            if (err) cb(err)
                            else{
                                cb(null, `user ${username} logged in successfully`)
                            }
                        })
                    }else cb(`username or password wrong`)
                    
                }
                
            }
        })
    }

    static logout(cb){
        Employee.readFile (function (err, data) {
            if(err) cb(err)
            else{
                data.forEach( item => {
                    item.logged = false
                })
                Employee.writeFile(data, function(err){
                    if (err) cb(err)
                    else cb(null)
                })
            }
        })
    }
}

module.exports = Employee