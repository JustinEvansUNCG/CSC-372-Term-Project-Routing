"use strict";
const fs = require("fs");

const Database = require("better-sqlite3");
const path = require("path");
const db = new Database(path.join(__dirname, "../db", "./MarketplaceDB.db"));
//const db = new sqlite(path.join(__dirname, "../.data", "./db/MarketplaceDB.db"));


//const Database = require("better-sqlite3");


function all(sql, ...params) {
    return db.prepare(sql).all(params);
}

function get(sql, ...params) {
    return db.prepare(sql).get(params);
}

function run(sql, ...params) {
    console.log(params);
    return db.prepare(sql).run(params[0]);
}
function exec(sql) {
    return db.exec(sql);
}

function db_close() {
    console.log("...Closing database connection.")
    db.close();
}


module.exports = {
    all,
    get,
    run,
    exec,
    db_close
};