const Employee = require('./Employee');

class Doctor extends Employee{
    constructor(employee) {
        super(employee);
        this.patient = [];
    }
}

module.exports = Doctor