const Model = require('../models/Model');
const View = require('../views/View');

class Controller {

    static listEmployee() {
        Model.getEmployee(function(err, data) {
            if (err) {
                View.displayError(err);
            } else {
                View.displayEmployee(data)
            }
        });
    }

    static register(employee) {
        Model.addEmployee(employee, function(err, data, length) {
            if (err) {
                View.displayError(err);
            } else {
                View.registerView(data, length);
            }
        });
    }

    static help() {
        View.help();
    }
}

module.exports = Controller;