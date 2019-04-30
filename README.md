# Bamazon
SQL database demo app using local server.
Uses MySQL package to interact with database and Inquirer package for command line prompts.
Customer can see a table of all products and select a product to purchase.
Customers select products by index number and must give an input-validated quantity for purchase.
Changes are reflected in the database, and total price is alerted to the customer.
Manager can select from four commands.
'View all' shows a table of all products.
'View low inventory' shows a table of all products with less than 5 stock.
'Add to inventory' shows all products, then allows manager to add stock to a specified product.
'Add new product' allows manager to add a new product row.
All numerical inputs are validated as integers (float 2 decimals for dollar inputs).
New product inputs are validated against the database to prevent duplicates.