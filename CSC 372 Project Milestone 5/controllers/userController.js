"use strict";
const model = require("../models/userModels");



function createUser(req, res, next) {
    let email = req.body.name;
    let password = req.body.description;
    let last_modified = new Date.now;
    console.log(last_modified);

    if (email && password) {
        let params = [email, password];
        try {
            //res.json(model.createUser(params));
        } catch (err) {
            console.error("Error while creating user: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }




}








module.exports = {
    createUser
};