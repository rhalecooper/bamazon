//
// 5. Then create a Node application called `bamazonCustomer.js`. 
//    Running this application will first display all of the items available for sale. 
//    Include the ids, names, and prices of products for sale.
//
// 6. The app should then prompt users with two messages.
//
// * The first should ask them the ID of the product they would like to buy.
// * The second message should ask how many units of the product they would like to buy.
//
// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
//
// * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
//
// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
// * This means updating the SQL database to reflect the remaining quantity.
// * Once the update goes through, show the customer the total cost of their purchase.
//
var mysql = require("mysql");
var inquirer = require("inquirer");

var host      = "localhost";
var port      = 3306;
var user      = "bamazon"
var password  = "bamazon1"
var database  = "bamazon"

var connection = mysql.createConnection({
  host: host,
  port: port,
  user: user,
  password: password,
  database: database
});

// console.log("connection is ", connection)

function listProducts() {
    console.log(" ")
    console.log ("  Here are the products we have for sale today:")
    console.log (" ")
    var query = "SELECT item_id, product_name, price FROM products WHERE stock_quantity > 0";
    connection.query(query, function (err, res) {
        // console.log ("res is ", res);
        var item_id      = 0; 
        var product_name = "" 
        var price        = 0 

        for (var i = 0; i < res.length; i++) {
            item_id      = res[i].item_id ;
            product_name = res[i].product_name
            price        = (res[i].price / 100).toFixed(2);
    
            console.log( "  " + product_name +  " ".repeat(15-product_name.length) 
            + "Item#: " + item_id + " ".repeat(5)
            + "Price: " + price   );
        }
        console.log (" ");
        takeOrder()
    })
};

function takeOrder() {
    inquirer
        .prompt([{
                name: "itemID",
                type: "input",
                message: "Enter the ID of the product you would like to buy: ",
                validate: function (value) {
                    if (isNaN(value) === false) { return true; }
                    return false;
                }
            },
            {
                name: "itemCount",
                type: "input",
                message: "How many of these would like to order?: ",
                validate: function (value) {
                    if (isNaN(value) === false) {  return true; }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            
            var query = "SELECT product_name, price, stock_quantity  FROM products where item_id = ?";
            connection.query(query, [answer.itemID], function (err, res) {
                var product_name    = res[0].product_name
                var price           = res[0].price;
                var stock_quantity  = res[0].stock_quantity
                
                console.log(" ");
                console.log("  You are ordering " + answer.itemCount + " of item " + product_name + " (#" + answer.itemID+ ")" )
                console.log(" ");

                fillOrder(answer.itemID, answer.itemCount, price, stock_quantity )
            })

        });
    }
    
    function fillOrder(itemID, itemCount, itemPrice, itemsInStock) {

        if (itemsInStock < itemCount) {
            console.log(" ");
            console.log("  *** Insufficient quantity! Only " + itemsInStock + " left in stock ***");
            listProducts();
        } else {
            var totalCost = ((itemCount * itemPrice) / 100).toFixed(2)
            console.log(" ");
            console.log("  Your total for this order is $", totalCost);
            console.log(" ");
            // update products 
            // SET stock_quantity = stock_quantity - X
            // where item_id = Y;
            var sqlText = ""
            sqlText = sqlText + "UPDATE products"
            sqlText = sqlText + " SET stock_quantity = stock_quantity - ?"
            sqlText = sqlText + " WHERE item_id = ?"
            sqlText = sqlText + " AND stock_quantity >= ?"
            var query = connection.query(sqlText, [itemCount, itemID, itemCount],
                function (err, res) {
                    //console.log ("result is ", res)
                    //console.log(res.affectedRows + " products updated!\n");
                    if (res.affectedRows > 0) {
                        console.log("  Your order has been filled");
                    } else {
                        console.log(" ");
                        console.log("There was a problem with your order");
                    }
                    listProducts()
                }
            )
        }
    };

for (i=0;i<20;i++) {
    console.log (" ")
}

console.log ("   ____                                                     ")                                                     
console.log ("  |  _ \\                                                   ")                                                  
console.log ("  | |_) |   __ _   _ __ ___     __ _   ____   ___    _ __   ") 
console.log ("  |  _ <   / _` | | '_ ` _ \\   / _` | |_  /  / _ \\  | '_ \\  ") 
console.log ("  | |_) | | (_| | | | | | | | | (_| |  / /  | (_) | | | | | ") 
console.log ("  |____/   \\__,_| |_| |_| |_|  \\__,_| /___|  \\___/  |_| |_| ") 
console.log ("                                                            ")                                                    
                                                           

listProducts()

