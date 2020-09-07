const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError");
const items  = require("./fakeDb.js");
const app = require("./app");


router.get("/", function(req, res) {
    res.send("Hello")
});