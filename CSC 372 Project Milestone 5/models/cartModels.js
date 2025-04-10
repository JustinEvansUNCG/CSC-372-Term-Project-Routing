"use strict";
const db = require("./db-conn");




function addToCart(params) {
    let sql = "INSERT INTO CartProducts" +
        "(cart_id, product_id, quantity) " +
        "VALUES(?, ?, ?); ";

    const info = db.run(sql, params);
    return info;
}



function removeFromCart(params) {
    let sql = "DELETE FROM CartProducts "
    + "WHERE id=? AND cart_id=?;";
    const info = db.run(sql, params);
    return info;
}

function clearCart(cart_id) {
    let sql = "DELETE FROM CartProducts WHERE cart_id=?; ";
    const info = db.run(sql, cart_id);
    return info;
}





module.exports = {
    addToCart,
    removeFromCart,
    clearCart

};