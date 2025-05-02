const fs = require("fs");
const path = require("path");

"use strict";
const db = require("./db-conn");


function createUser(params) {
    let sql = "INSERT INTO Users " +
        "(name, platform, release_year, genre, publisher, developer, rating) " +
        "VALUES(?, ?, ?, ?, ?, ?, ?); ";
    const info = db.run(sql, params);
    return info;
}




module.exports = {
    createUser
};