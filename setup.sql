-- 1. Create a MySQL Database called `bamazon`.
-- 2. Then create a Table inside of that database called `products`.
-- 3. The products table should have each of the following columns:
--    * item_id (unique id for each product)
--    * product_name (Name of product)
--    * department_name
--    * price (cost to customer)
--    * stock_quantity (how much of the product is available in stores)
-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

CREATE DATABASE IF NOT EXISTS bamazon ;

USE bamazon;

--   DROP TABLE `bamazon`.`products`;


CREATE TABLE IF NOT EXISTS products (
   item_id INT auto_increment NOT NULL 
 , product_name VARCHAR(100) NULL
 , department_name VARCHAR(100) NULL
 , price INT NULL
 , stock_quantity INT NULL
 , PRIMARY KEY (item_id)
);

INSERT INTO bamazon.products
( 
product_name,
department_name,
price,
stock_quantity
)
SELECT 
   "Big Hammer" as product_name,
   "tools"      as department_name,
   1000         as price,
   22           as stock_quantity
   where 0 = (select count(item_id) from `bamazon`.`products` where product_name = "Big Hammer")
UNION ALL
   SELECT 
   "Little Hammer" as `product_name`,
   "tools" as `department_name`,
   500 as `price`,
   42 as `stock_quantity`
   where 0 = (select count(item_id) from `bamazon`.`products` where product_name = "Little Hammer")
UNION ALL
   SELECT 
   "Little Radio" as `product_name`,
   "electronics" as `department_name`,
   2500 as `price`,
   11 as `stock_quantity`
   where 0 = (select count(item_id) from `bamazon`.`products` where product_name = "Little Radio")
Union ALL
SELECT 
   "Big Radio" as `product_name`,
   "electronics" as `department_name`,
   5000 as `price`,
   22 as `stock_quantity`
   where 0 = (select count(item_id) from `bamazon`.`products` where product_name = "Big Radio")
UNION ALL
   SELECT 
   "Little TV" as `product_name`,
   "electronics" as `department_name`,
   2500 as `price`,
   11 as `stock_quantity`
   where 0 = (select count(item_id) from `bamazon`.`products` where product_name = "Little TV")
Union ALL
SELECT 
   "Big TV" as `product_name`,
   "electronics" as `department_name`,
   5000 as `price`,
   22 as `stock_quantity`
   where 0 = (select count(item_id) from `bamazon`.`products` where product_name = "Big TV")   
UNION ALL
   SELECT 
   "Big Drill" as `product_name`,
   "tools" as `department_name`,
   1000 as `price`,
   22 as `stock_quantity`
   where 0 = (select count(item_id) from `bamazon`.`products` where product_name = "Big Drill")
UNION ALL
   SELECT 
   "Little Drill" as `product_name`,
   "tools" as `department_name`,
   500 as `price`,
   42 as `stock_quantity`
   where 0 = (select count(item_id) from `bamazon`.`products` where product_name = "Little Drill")
;
use bamazon;

select * from bamazon.products ;

update products 
SET stock_quantity = stock_quantity - 2
where item_id = 1;

select * from bamazon.products ;

update products set stock_quantity = 12 where stock_quantity = 0
