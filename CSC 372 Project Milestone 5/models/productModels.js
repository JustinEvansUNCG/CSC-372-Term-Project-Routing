const fs = require("fs");
const path = require("path");

"use strict";
const db = require("./db-conn");

function getAll() {
    let sql = "SELECT name, image_url, price, product_id, product_type, description FROM Products;";
    const data = db.all(sql);
    return data;
}
function getById(product_id) {
    let sql = "SELECT name, image_url, price, description, product_type FROM Products WHERE product_id=" + product_id + ";";
    const data = db.all(sql);
    return data;
}

function getByTypeAndName(type, name) {

    let sql = "SELECT name, image_url, price, product_id, product_type, description FROM Products "
        + "WHERE name LIKE '%" + name + "%' AND product_type LIKE '%" + type + "%';";
    const data = db.all(sql);
    return data;

}


function getByName(name) {

    let sql = "SELECT name, image_url, price, product_id, product_type, description FROM Products "
         + "WHERE name LIKE '%" + name + "%';";
    const data = db.all(sql);
    return data;

}


function getByType(type) {

    let sql = "SELECT name, image_url, price, product_id, product_type, description FROM Products "
         + "WHERE product_type LIKE '%" + type + "%';";
    const data = db.all(sql);
    return data;

}

function getProductDetails(product_id) {

    let sql = "SELECT name, image_url, price FROM Products "
         + "WHERE product_id=" + product_id + ";";
    const data = db.all(sql);
    return data;

}

function createProduct(params) {
    let sql = "INSERT INTO Products" +
        "(name, description, image_url, price, product_type) " +
        "VALUES(?, ?, ?, ?, ?); ";

    const info = db.run(sql, params);
    return info;
}

function removeProduct(product_id) {
    let sql = "DELETE FROM Products" +
    " WHERE product_id=?;";

const info = db.run(sql, product_id);
return info;
}

function updateProduct(params) {
    let sql = "UPDATE Products" +
        " SET name=?, description=?, image_url=?, price=?, product_type=? " +
        "WHERE product_id=?; ";

    console.log(params[0]);
    const info = db.run(sql, params);
    return info;
}


function initializeDb() {
    let sql = fs.readFileSync(path.join(__dirname, "../public", "./372 DB schema", "./create_tables.sql"), 'utf-8');
    db.exec(sql);
    sql = fs.readFileSync(path.join(__dirname, "../public", "./372 DB schema", "./insert_categories.sql"), 'utf-8');
    db.exec(sql);
    sql = fs.readFileSync(path.join(__dirname, "../public", "./372 DB schema", "./insert_products.sql"), 'utf-8');
    db.exec(sql);
    sql = fs.readFileSync(path.join(__dirname, "../public", "./372 DB schema", "./insert_user.sql"), 'utf-8');
    db.exec(sql);


    return;
    
}






module.exports = {
    getAll,
    getByTypeAndName,
    getByName,
    getByType,
    getProductDetails,
    createProduct,
    removeProduct,
    updateProduct,
    initializeDb,
    getById

};