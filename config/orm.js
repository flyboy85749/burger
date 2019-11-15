function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }
}
var connection = require("./connection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
var orm = {

  selectAll: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    console.log(queryString);
    console.log(tableInput);
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      // console.log(result);
      cb(result);

    });
  },

  insertOne: function (tableInput, Cols, valOfCol, cb) {
    var queryString = "INSERT INTO " + tableInput;
    valOfCol[1] = true;
    queryString += " (";
    queryString += Cols.toString();
    queryString += ") ";
    queryString += "VALUES ('";
    queryString += valOfCol[0];
    queryString += "', " + valOfCol[1];
    queryString += "); ";

    console.log(queryString);
    console.log(valOfCol);
    
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  },

  updateOne: function (tableInput, colToSearch, condition) {
    var querystring = "UPDATE ?? SET ?? WHERE ??";
    connection.query(querystring, [tableInput, colToSearch, condition], function (err, results) {
      if (err) throw err;
      console.log(result);
    })
  },

  deleteOne: function (tableInput, valOfCol) {
    var queryString = "DELETE FROM ?? WHERE ??";
    connection.query(queryString, [tableInput, valOfCol], function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  },

};

module.exports = orm;
