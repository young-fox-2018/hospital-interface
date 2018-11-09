const fs = require('fs');

class Employee {
    constructor(employee) {
        this.id = employee.id
        this.name = employee.name
        this.position = employee.position
        this.username = employee.username
        this.password = employee.password
        this.isLoggedIn = employee.isLoggedIn
    }

    static getEmployee(callback) {
        fs.readFile('./models/employees.json', 'utf8', function(err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, JSON.parse(data));
            }
        });
    }

    static saveEmployee(data, callback) {
        fs.writeFile('./models/employees.json', JSON.stringify(data, null, 2), 'utf8', function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }

    static addEmployee(employee, callback) {
        Employee.getEmployee(function(err, data) {
            if (err) {
                callback(err);
            } else {

                // check if current username already exist
                let foundUser = false;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name === employee[0]) {
                        foundUser = true;
                    }
                }
                
                if (foundUser) {
                    callback(`Employee with username ${employee[0]} already exist`);
                } else {
                    let newEmployee = {
                        id: data.length+1, 
                        name: employee[0], 
                        position: employee[2],
                        username: employee[0],
                        password: employee[1],
                        isLoggedIn: false
                    }

                    
    
                    data.push(new Employee(newEmployee));
                    
                    Employee.saveEmployee(data, function(err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, newEmployee, data.length);
                        }
                    });
                }
                
                
            }
        })
    }
    
    static updateEmployee(username, field, value, callback) {        
        Employee.getEmployee(function(err, data) {
            if (err) {
                callback(err);
            } else {
                // find employee to update                
                for (let i = 0; i < data.length; i++) {
                    if (data[i].username === username) {                         
                        data[i][field] = value;                  
                    }
                }

                Employee.saveEmployee(data, function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null);
                    }
                })
            }
        });
    }

    static searchData(options, callback) {
        Employee.getEmployee(function(err, data) {
            if (err) {
                callback(err);
            } else {                
                //loop data and match with username
                for (let i = 0; i < data.length; i++) {
                    if (data[i][options.field] === options.value) {
                        callback(null, data[i]);
                    }
                }
            }
        })
    }

    static login(dataUser, callback) {
        Employee.getEmployee(function(err, data) {
            if (err) {
                callback(err);
            } else {
                let canLoggedIn = true;
                // check if there are other ppl that currently login
                for (let i = 0; i < data.length; i++) {
                    if (data[i].isLoggedIn === true) {
                        canLoggedIn = false;
                    }
                }
                
                if (!canLoggedIn) {
                    callback(`Logout first before login`);
                } else {
                    // can login but first must check the username and password
                    let options = {
                        field: 'username',
                        value: dataUser[0],
                    }
                    Employee.searchData(options, function(err, data) {
                        if (err) {
                            callback(err);
                        } else {
                            //password true, login success                        
                            if (data.password === dataUser[1]) {
                                Employee.updateEmployee(dataUser[0], "isLoggedIn", true, function(err) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        callback(null, data);
                                    }
                                });                    
                            } else {
                                callback(`username/password wrong`)                              
                            }
                        }
                    });
                }
            }
        }) 
    }

    static getLoggedIn(callback) {
        Employee.getEmployee(function(err, data) {
            if (err) {
                callback(err);
            } else {                
                // check if there are other ppl that currently login
                for (let i = 0; i < data.length; i++) {
                    if (data[i].isLoggedIn === true) {
                        callback(null, data[i]);
                    }
                }
            }
        })
    }

    static logout(callback) {
        Employee.getEmployee(function(err, data) {
            if (err) {
                callback(err);
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].isLoggedIn === true) {
                        data[i].isLoggedIn = false;
                    }
                }
                Employee.saveEmployee(data, function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, 'Success');
                    }
                })

            }
        });
    }
}


module.exports = Employee


