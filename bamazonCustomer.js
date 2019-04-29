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

//show all products on app open
connection.connect(function (err) {
    if (err) throw err;
    connection.query("SELECT product_name, department_name, price, stock FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        //call function for inquirer prompt after showing table
        promptPurchase(res);
    })
})

//function for inquirer prompt for user purchases
function promptPurchase(products) {
    //create indices array to provide a list of choices for user selection
    let indices = [];
    for (i = 0; i < products.length; i++) {
        indices.push(i);
    };

    //inquirer prompt for product selection
    inquirer.prompt({
        type: "list",
        message: "Purchase a product by selecting its index",
        name: "index",
        choices: indices
    }).then(function (res) {
        //declare and alert user-selected product
        const product = products[res.index];
        const name = product.product_name;
        console.log(product.product_name + " selected.");

        //inquirer prompt for purchase quantity
        inquirer.prompt({
            type: "input",
            message: "Input quantity for purchase",
            name: "quantity",
            //user input validation
            validate: function (input) {
                let q = parseFloat(input);
                if (q<=0) {
                    return "Positive integers only"
                }
                else if (q <= product.stock && q === Math.floor(q)) {
                    return true;
                }
                else if (q !== Math.floor(q)) {
                    return "Integer values only";
                }
                else {
                    return "Not enough stock. Current stock: " + product.stock;
                }
            }
        }).then(function (res) {
            const q = parseInt(res.quantity);
            const remaining = product.stock - q;
            connection.query("UPDATE products SET stock = ? WHERE product_name = ?", [remaining, name],
                function (err, res) {
                    if (err) throw err;
                    console.log("Successful purchase! Bill: " + parseFloat(q * product.price).toFixed(2));
                    connection.end();
                });
        });
    });
};