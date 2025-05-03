const fs = require("fs");
const path = require("path");

"use strict";
const db = require("./db-conn");


function createUser(params) {
    let sql = "INSERT INTO Users " +
        "(email, password, name, last_modified, user_type) " +
        "VALUES(?, ?, ?, ?, ?); ";
    const info = db.run(sql, params);
    return info;
}

function loginUser(params) {
    let sql = "SELECT id FROM Users WHERE email='" + params[0] + "' AND password='" + params[1] + "';";
    const info = db.all(sql);
    return info;
}


module.exports = {
    createUser,
    loginUser
};