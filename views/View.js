class View {

    static help() {
        console.log(`Welcome to Happy Family's Hospital System`);
        console.log(`Currently on beta, please use the command below`);
        console.log(`===============================================`);
        console.log(`node index.js listEmployee`);
        console.log(`node index.js register <name> <password> <position>`);
        console.log(`node index.js login <username> <password>`);
        console.log(`node index.js logout`);
    }

    static displayEmployee(employee) {        
        
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

    static loginPage(data) {
        console.log(`user ${data} logged in successfully!`);
    }

    static logoutPage() {
        console.log(`Logged out...`)
    }

    static restrictedPage() {
        console.log(`You don't have access to this menu!`);
    }
    
    static savePatient(total) {
        console.log(`Data pasien berhasil ditambahkan. Total data pasien: ${total}`);
    }
}

module.exports = View;