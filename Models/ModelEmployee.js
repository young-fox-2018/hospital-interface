const fs = require("fs")

class ModelEmployee {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
      this.login = false
    }

    static readFile(file,cb){
        fs.readFile(file,"utf8",(err,data) => {
            if(err){
                cb({
                    message: "error readfile model employee",
                    err: err
                })
            } else {
                cb(null,JSON.parse(data))
            }
        })
    }

    static writeFile(file,data,cb){
        fs.writeFile(file,data,(err)=>{
            if(err){
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    static register(name, password, position, cb){
        ModelEmployee.readFile("./employee.json", function(err,data){
            if(err){
                cb(err)
            } else {
                data.push(new ModelEmployee(name,password,position))
                ModelEmployee.writeFile("./employee.json",JSON.stringify(data, null, 2),function(err){
                    if(err){
                        cb({
                            message: "error write file",
                            err: err
                        })
                    } else {
                        cb(null,data)
                    }
                })
            }
        })

    }

    static login(username,password,cb){
        this.readFile("./employee.json", function(err,data){
            if(err){
                cb(err)
            } else {
                let isOnePersonLogin = false
                for( let i in data){
                    if(data[i].login === true){
                        isOnePersonLogin = true
                    }
                }
                if(isOnePersonLogin){
                    cb("Ada Member yang sedang login")
                } else {
                    let cekLogin = false
                    for( let i in data){
                        if(data[i].username == username && data[i].password == password){
                            data[i].login = true
                            cekLogin = true
                            ModelEmployee.writeFile("./employee.json",JSON.stringify(data, null, 2),function(err){
                                if(err){
                                    cb({
                                        message: "error write file",
                                        err: err
                                    })
                                } else {
                                    cb(null,data[i])
                                }
                            })
                            break
                        }
                    }

                    if(!cekLogin){
                        cb("username / password wrong")
                    }
                }
            }
        })
    }

    static logout(name,cb){
        this.readFile("./employee.json", function(err,data){
            if(err){
                cb({
                    message: "error read file when logout",
                    err: err
                })
            } else {
                let index = data.findIndex((element) => element.username === name && element.login === true)
                if(index === -1){
                    cb("username salah, tidak bisa logout")
                } else {
                    data[index].login = false
                    ModelEmployee.writeFile("./employee.json",JSON.stringify(data, null, 2),function(err){
                        if(err){
                            cb({
                                message: "error write file when logout",
                                err: err
                            })
                        } else {
                            cb(null,data[index])
                        }
                    })
                }
            }
        })
    }

}

module.exports = ModelEmployee