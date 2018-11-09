class View {

    static help() {
        console.log(`Welcome to Happy Family's Hospital System`);
        console.log(`Currently on beta, please use the command below`);
        console.log(`===============================================`);
        console.log(`node index.js listEmployee`);
        console.log(`node index.js register <name> <password> <position>`);
    }

    static displayEmployee(employee) {
        employee = JSON.parse(employee);
        
        if (employee.length === 0) {
            console.log(`Currently no employee registered`);
        } else {
            console.log(employee);
        }
    }

    static displayError(err) {
        console.log(err);
    }

    static registerView(employee, total) {
        console.log(`Save data success ${JSON.stringify(employee)}. Total employee: ${total}`);
    }
}

module.exports = View;