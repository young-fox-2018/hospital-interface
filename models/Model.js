const fs = require('fs');
const Employee = require('./Employee');

class Model {

    static getEmployee(callback) {
        fs.readFile('./models/employee.json', 'utf8', function(err, data) {
            if (err) {
                callback(err)
            } else {
                callback(err, data)
            }
        });
    }

    static saveEmployee(data, callback) {
        fs.writeFile('./models/employee.json', JSON.stringify(data, null, 2), 'utf8', function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        })
    }

    static addEmployee(employee, callback) {
        Model.getEmployee(function(err, data) {
            if (err) {
                callback(err);
            } else {
                data = JSON.parse(data)
                let newEmployee = {
                    id: data.length+1, 
                    name: employee[0], 
                    position: employee[2],
                    username: employee[0],
                    password: employee[1]
                }
                data.push(new Employee(newEmployee));
                Model.saveEmployee(data, function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, newEmployee, data.length);
                    }
                }) 

                // callback(null, data);
            }
        })
    }
}


module.exports = Model


