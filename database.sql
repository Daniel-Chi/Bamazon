CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
	id INTEGER (10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (30) NOT NULL,
    department_name VARCHAR (30),
    price DECIMAL (12, 2),
    stock INTEGER (4),
    PRIMARY KEY (id)
);

SELECT * FROM products;
INSERT INTO products (product_name, department_name, price, stock) VALUES ("Toilet Paper", "necessities", 19.95, 100);
INSERT INTO products (product_name, department_name, price, stock) VALUES ("Blu-ray Player", "electronics", 39.99, 20);
INSERT INTO products (product_name, department_name, price, stock) VALUES ("Plain White Socks", "clothing", 1.49, 100);
INSERT INTO products (product_name, department_name, price, stock) VALUES ("Picture Frame", "household", 11.99, 40);
INSERT INTO products (product_name, department_name, price, stock) VALUES ("Wooden Chair", "household", 56.99, 20);
INSERT INTO products (product_name, department_name, price, stock) VALUES ("Speakers", "electronics", 79.95, 30);
INSERT INTO products (product_name, department_name, price, stock) VALUES ("Oreo O's", "food", 3.98, 50);
INSERT INTO products (product_name, department_name, price, stock) VALUES ("Badminton Set", "sporting goods", 49.99, 20);
INSERT INTO products (product_name, department_name, price, stock) VALUES ("Fidget Spinner", "toys", 4.95, 30);
INSERT INTO products (product_name, department_name, price, stock) VALUES ("Apple Air Pods", "electronics", 199.00, 20);
