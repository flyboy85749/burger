const orm = require("../config/orm.js");

const burger = {
    selectAll: function (cb) {
        orm.selectAll("burgers", function (res) {
            cb(res);
        })
    },

    insertOne: function (Cols, valOfCol, cb) {
        orm.insertOne("burgers", Cols, valOfCol, function (res) {
            cb(res);
        })
    },

    updatetOne: function (tableInput, colToSearch, condition, cb) {
        orm.updateOne("burgers", tableInput, colToSearch, condition, function (res) {
            cb(res);
        })
    },

    deleteOne: function (tableInput, valOfCol, cb) {
        orm.deleteOne("burgers", tableInput, valOfCol, function (res) {
            cb(res);
        })
    }

}

module.exports = burger;