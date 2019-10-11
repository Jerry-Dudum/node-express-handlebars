var express = require("express");

var router = express.Router();

// Import the model (movie.js) to use its database functions.
var movie = require("../models/movie.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    movie.all(function (data) {
        var hbsObject = {
            movies: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/movies", function (req, res) {
    movie.create([
        "name", "watched"
    ], [
        req.body.name, req.body.watched
    ], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.put("/api/movies/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    movie.update({
        watched: req.body.watched
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/movies/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    movie.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;