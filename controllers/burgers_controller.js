const express = require("express");

const burger = require("../models/burger.js");

const app = express.Router();

// will put all our routes in here

    app.get("/", function (req, res) {
        burger.selectAll(function (data) {
            let exhbsObj = {
                burgers: data
            };
            // console.log(exhbsObj);
            res.render("index", exhbsObj);
        })
    });

    // add a burger
    app.get("/api/burgers", function (req, res) {
        console.log(req.query);
        burger.insertOne(
            ["burger_name", "devoured"],
            [req.query.burger, req.query.devoured],
            function (result) {
                res.json({ id: result.insertId });
            }
        )
    });

    // update a burger
    app.put("/api/burgers/:id", function (req, res) {
        let condition = "id = " + req.params.id;
        console.log("condition", condition);
        burger.updatetOne({ devoured: req.body.devoured }, condition, function (result) {
            if (result, changedRows === 0) {
                return res.status(404).end();
            }
            else {
                res.status(200).end();
            }
        })
    });

    // Delete an burger by id
    app.delete("/api/burgers/:id", function (req, res) {
        db.Burger.destroy({ where: { id: req.params.id } }).then(function (
            dbBurger
        ) {
            res.json(dbBurger);
        });
    });
module.exports = app;

