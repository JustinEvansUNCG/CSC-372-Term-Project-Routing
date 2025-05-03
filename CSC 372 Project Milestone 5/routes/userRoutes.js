"use strict";
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");





router.post("/create", userController.createUser);


router.post("/login", userController.loginUser);

router.get("/login/check", userController.checkLogin);

router.get("/logout", userController.logout);







module.exports = router;