"use strict";
const db = require("./db-conn");

function itemsInCart(params) {

    let sql = "SELECT cart_id FROM Carts WHERE user_id=?;";
    let cart_id = db.get(sql, params[0]);



    sql = "SELECT * FROM CartProducts INNER JOIN Products ON Products.product_id=CartProducts.product_id WHERE cart_id=?;";
    const info = db.all(sql, cart_id.cart_id);
    return info;
}



async function addToCart(params) {

    let sql = "SELECT cart_id FROM Carts WHERE user_id=?;";
    let cart_id = await db.get(sql, params[0]);
    console.log(cart_id.cart_id);


    sql = "INSERT INTO CartProducts" +
        "(cart_id, product_id, quantity) " +
        "VALUES(?, ?, 1); ";

    const info = db.run(sql, [cart_id.cart_id, params[1]]);
    return cart_id;
}



function removeFromCart(params) {
    let sql = "SELECT cart_id FROM Carts WHERE user_id=" + params[1] + ";";
    let cart_id = db.get(sql);

    let query_params = [params[0], cart_id.cart_id]; 


    sql = "DELETE FROM CartProducts "
        + "WHERE product_id=? AND cart_id=?;";
    const info = db.run(sql, query_params);
    return info;
}

function clearCart(user_id) {
    let sql = "SELECT cart_id FROM Carts WHERE user_id=" + user_id + ";";
    let cart_id = db.get(sql);

    let query_params = [cart_id.cart_id]; 



    sql = "DELETE FROM CartProducts WHERE cart_id=?; ";
    const info = db.run(sql, query_params);
    return info;
}


function createCart(params) {
    let sql = "INSERT INTO Carts" +
        "(status, date_created, user_id) " +
        "VALUES(0, ?, ?); ";
    const info = db.run(sql, params);

}

function updateCart(params) {
    let sql = "SELECT cart_id FROM Carts WHERE user_id=" + params[1] + ";";
    let cart_id = db.get(sql);

    sql = "UPDATE CartProducts" +
        " SET quantity=? " +
        "WHERE product_id=? AND cart_id=" + cart_id.cart_id + "; ";

    console.log(params[0]);
    const info = db.run(sql, [params[2], params[0]]);
    return info;
}

module.exports = {
    itemsInCart,
    addToCart,
    removeFromCart,
    clearCart,
    createCart,
    updateCart

};