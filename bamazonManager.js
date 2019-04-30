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
            if (res.length === 0) {
                console.log("No low inventory");
            }
            else {
                console.table(res);
            };
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
            const products = res;
            console.table(res);
            //inquirer prompt to select by ID an item to increase inventory
            inquirer.prompt([{
                type: "input",
                message: "Select an item by ID number.",
                name: "id",
                //input validation for id number
                validate: function (input) {
                    let n = parseFloat(input);
                    if (n != Math.floor(n)) {
                        return "Choose a valid ID number";
                    }
                    else if (n < 1) {
                        return "Choose a valid ID number";
                    }
                    else if (n > res.length) {
                        return "Choose a valid ID number";
                    }
                    else {
                        return true;
                    }
                }
            }, {
                type: "input",
                message: "How many should be added?",
                name: "quantity",
                //input validation for added quantity
                validate: function (input) {
                    let q = parseFloat(input);
                    if (q != Math.floor(q)) {
                        return "Must be an integer";
                    }
                    else if (q < 1) {
                        return "Must be positive";
                    }
                    else {
                        return true;
                    }
                }
            }]).then(function (res) {
                //specify product by parsing id into index
                const product = products[parseInt(res.id) - 1];
                //update table in database with new quantity
                const total = product.stock + parseInt(res.quantity);
                connection.query("UPDATE products SET stock = ? WHERE id = ?", [total, res.id],
                    function (err, res) {
                        if (err) throw err;
                        console.log("success");
                        connection.end();
                    }
                );
            });
        }
    );
};

//function to add new products into database
function addNew() {
    //declare empty array to be filled with existing products for input validation
    let existing = [];
    connection.query("SELECT product_name FROM products",
        function (err, res) {
            if (err) throw err;
            //populate existing products array
            for (i = 0; i < res.length; i++) {
                existing.push(res[i].product_name.toLowerCase())
            };
            //inquirer prompt for all data concerning new product
            inquirer.prompt([{
                type: "list",
                message: "What category is your product?",
                name: "department_name",
                choices: ["necessities", "clothing", "household", "childcare", "chemicals/materials", "food", "toys", "books", "sporting goods", "automotive"]
            }, {
                type: "input",
                message: "What would you like to add?",
                name: "product_name",
                //input validation to check that the product does not already exist in the database
                validate: function (input) {
                    const query = input.toLowerCase();
                    if (existing.indexOf(query) != -1) {
                        return "Already in the database";
                    }
                    else {
                        return true;
                    }
                }
            }, {
                type: "input",
                message: "What is the price?",
                name: "price",
                //input validation to check for valid dollar values
                validate: function (input) {
                    const p = parseFloat(input).toFixed(2);
                    if (p != parseFloat(input)) {
                        return "Must be a valid dollar value";
                    }
                    else if (p <= 0) {
                        return "Must be positive";
                    }
                    else {
                        return true
                    }
                }
            },{
                type: "input",
                message: "How many will you add?",
                name: "stock",
                //input validation for quantity added
                validate: function (input) {
                    const q = parseInt(input);
                    if (q!=parseFloat(input)){
                        return "Must be an integer";
                    }
                    else if (q<1) {
                        return "Must be positive";
                    }
                    else {
                        return true;
                    }
                }
            }]).then(function(res){
                //add input values as a new table row into database
                connection.query("INSERT INTO products (product_name, department_name, price, stock) VALUES (?, ?, ?, ?)",
                [res.product_name, res.department_name, res.price, res.stock],
                function (err, res){
                    if (err) throw err;
                    console.log("New product successfully added.")
                    connection.end();
                }
                );
            });
        });
};