var mysql = require('mysql');
var pass = "Thecampingtree1."


var con = mysql.createConnection({
    host: "localhost",
    user: "node_test",
    password: "forsaken1.",
    database: "recyclesmart"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO map (id, x, y, label, address, phonenumber, haversine) VALUES (123, -104.4444,50.23214, 'Plastic Bottle', '123 who knows','(306)501-2345', 23123 )";
    con.query(sql, function(err, result) {
        if(err) throw err;
        console.log("1 record inserted");
    });
  });

function setMaps(){}
function getMaps(){}
function getDescription(){}
function setDescription(){}

