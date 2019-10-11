// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var movie = {
    all: function (cb) {
        orm.all("movies", function (res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function (cols, vals, cb) {
        orm.create("movies", cols, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.update("movies", objColVals, condition, function (res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        orm.delete("movies", condition, function (res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller (moviesController.js).
module.exports = movie;