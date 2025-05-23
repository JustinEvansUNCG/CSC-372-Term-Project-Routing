"use strict";
const model = require("../models/userModels");
const model2 = require("../models/cartModels");



function createUser(req, res, next) {

    let name = req.body.name.toLowerCase();
    let email = req.body.email.toLowerCase();
    let password = req.body.password;
    let last_modified = new Date().toISOString().substring(0, 10);
    let role = 0;
    let feedback = "";

    if (email && password && name) {
        let params = [email, password, name, last_modified, role];
        try {
            model.createUser(params);

            if (email && password) {

                let params = [email, password];
                try {
        
                    //res.json(model.loginUser(params));
                    feedback = model.loginUser(params);
                    if (feedback.length != 0) {
                        feedback = model.loginUser(params)[0]["id"];
                    }
        
                    console.log(typeof (feedback));
        
                } catch (err) {
                    console.error("Error while creating user: ", err.message);
                    next(err);
                }
        
        
                if (typeof (feedback) === "number") {
                    req.session.userId = feedback;
                    let date_created = new Date().toISOString().substring(0, 10);
                    model2.createCart([date_created, req.session.userId]);
        
                    res.send('Logged in');
                }
        
            }
            else {
                res.status(400).send("Invalid Request");
            }


        } catch (err) {
            console.error("Error while creating user: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }




}

function loginUser(req, res, next) {

    //console.log(req.session.userId);
    let email = String(req.body.email.toLowerCase());
    let password = String(req.body.password.toLowerCase());
    let feedback = "";

    if (email && password) {

        let params = [email, password];
        try {

            //res.json(model.loginUser(params));
            feedback = model.loginUser(params);
            if (feedback.length != 0) {
                feedback = model.loginUser(params)[0]["id"];
            }

            console.log(typeof (feedback));

        } catch (err) {
            console.error("Error while creating user: ", err.message);
            next(err);
        }


        if (typeof (feedback) === "number") {
            req.session.userId = feedback;

            res.send('Logged in');
        }

    }
    else {
        res.status(400).send("Invalid Request");
    }

}


function checkLogin(req, res, next) {
    console.log(req.session.userId);
    if (req.session.userId) {
        res.send({ userId: req.session.userId });
    } else {
        res.send({ userId: null });
    }
}


function logout(req, res, next) {
    req.session.userId = null;
    res.send({ status: "success" });
}


module.exports = {
    createUser,
    loginUser,
    checkLogin,
    logout
};