const request = require("request");
var express = require('express');


var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'tabula',
        password: 'vprhurhyhakh$',
        server: 'SRV-PRIORITY', 
        database: 'z3balad' 
    };
 var dist = req.query.id;
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           var currentdate = new Date();

     
        // query to the database and get the records
        request.query(`SELECT *
FROM ORDERS
INNER JOIN DISTRLINES 
ON ORDERS.BAL_DISTRLINE = DISTRLINES.DISTRLINE AND DISTRLINES.DISTRLINECODE LIKE '${dist}' 
INNER JOIN CUSTOMERS ON CUSTOMERS.CUST = ORDERS.CUST ORDER BY ORDERS.BAL_DISTRORDER`, function (err, recordset) {
            
            if (err) console.log(err)
            //console.log(req)
            // send records as a response
            res.send(recordset);
            
          





        });
    });
});





var server = app.listen(5770, function () {
    console.log('Server is running..');
});