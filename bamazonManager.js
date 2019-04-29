//require node packages
const mysql = require("mysql");
const inquirer = require("inquirer");

//create database connection
const connection = mysql.createConnection({
    host: "localhost",
    post: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});
//connect to server
connection.connect(function (err) {
    if (err) throw err;
    //inquirer prompt for manager actions
    inquirer.prompt({
        type: "list",
        message: "Select an action",
        choices: ["View all", "View low inventory", "Add to inventory", "Add new product"],
        name: "action"
    }).then(function (res) {
        let a = res.action
        switch (a) {
            case "View all":
                viewAll();
                break;
            case "View low inventory":
                viewLow();
                break;
            case "Add to inventory":
                addInv();
                break;
            case "Add new product":
                addNew();
                break;
            default:
                console.log("Switch/Case input error");
        };
    })
});

//function to view all products
function viewAll() {
    connection.query("SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            connection.end();
        }
    );
};

//function to view low inventory products
function viewLow() {
    connection.query("SELECT * FROM products WHERE stock < 5",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            connection.end();
        }
    );
};

//function to add inventory to existing products
function addInv() {
    //first show table of existing products
    connection.query("SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            console.table(res);
        }
    ).then(
        inquirer.prompt([{
            type: "input",
            message: "Select an item by ID number.",
            name: "id",
            validate: function(input){
                let n = parseFloat(input);
                
                
            }
        }, {

        }]).then(function (res) { })
    )
}