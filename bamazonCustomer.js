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
    console.log ("Here are the products we have for sale today:")
    console.log (" ")
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function (err, res) {
        // console.log ("res is ", res);
        var item_id      = 0; 
        var product_name = "" 
        var price        = 0 

        for (var i = 0; i < res.length; i++) {
            item_id      = res[i].item_id ;
            product_name = res[i].product_name
            price        = (res[i].price / 100).toFixed(2);
    
            console.log( product_name +  " ".repeat(15-product_name.length) 
            + "Item Number: " + item_id + " ".repeat(5)
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
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "itemCount",
                type: "input",
                message: "How many items would like to order?: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            console.log(" ");
            console.log(" you are ordering " + answer.itemCount + " of item number " + answer.itemID)
            console.log(" ");

            listProducts()
        });
}

listProducts()

