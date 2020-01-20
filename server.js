// var http = require('http');
var fs = require('fs');
const express = require('express');
const app = express();
const http = require('http');
//var express = require('express');
var router = express.Router();
var Redshift = require('node-redshift');

var redshiftClient;
var options;
var res;

// const path = require('path');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const hsts = require('hsts');
// const helmet = require('helmet');
// // const request = require('request');
// const jwt = require('jsonwebtoken');
// const config = require('./config');
// const jwtMiddleware = require('./jwt-middleware');
//var Redshift = require('node-redshift');
//app.use(express.static(__dirname + "/overview.html"));

app.use(express.static('HTML_Files'));

var clientConfiguration = {
    user: "prdanalytics",
    database: "redshiftdb",
    password: "M#r@215PM",
    port: 5439,
    host: "10.31.13.6",
    // ServerAliveInterval:240,
    // ServerAliveCountMax: 2,
  };
  var redshift = new Redshift(clientConfiguration);
  var redshiftFactory = function() {
    var redshiftClient = new Redshift(clientConfiguration, {rawConnection: true});
    redshiftClient.rawQuery = function(query, queryCb) {
        redshiftClient.connect(function(err) {
            if (err) console.log(err);
            else {
                redshiftClient.query(query, {raw: true}, function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (typeof queryCb === 'function') {
                            queryCb(err, data);
                        }
                        console.log(data);
                        redshiftClient.close();
                    }
                });
            }
        });
    };

    return redshiftClient;
}
module.exports = redshiftFactory;
app.get('/rows', function (req, res) {
    redshift.query("SELECT * FROM pres_sandbox.warranty_table", {raw: true},function(err, data){
        if(err) throw err;
        else{
          console.log(data);
          res.send(data);
          // if you want to close client pool, uncomment redshift.close() line
          // but you won't be able to make subsequent calls because connection is terminated
          // redshift.close()
        }
      });
// const redshiftClient_1 = redshiftFactory();
// redshiftClient_1.rawQuery('SELECT * FROM pres_sandbox.warranty_table', function(err, data) {
//     console.log(data);
//    //JSON.parse(data);
//     
// });ei_id_model,failure_mode,potential_dtc,claim_count,avg_cost_per_ei
});
app.get('/Ei_data', function (req, res) {
redshift.query("select ei_id,ei_date_time,count(claim_count) FROM pres_sandbox.warranty_ei group by ei_id,ei_date_time", {raw: true},function(err, data){
    if(err) throw err;
    else{
      console.log(data);
      res.send(data);
      // if you want to close client pool, uncomment redshift.close() line
      // but you won't be able to make subsequent calls because connection is terminated
      // redshift.close()
    }
  });
});
app.get('/Ei_data_details', function (req, res) {
  redshift.query("select ei_id,ei_date_time,count(claim_count),ei_id_model,failure_mode,potential_dtc,avg_cost_per_ei FROM pres_sandbox.warranty_ei group by ei_id,ei_date_time,ei_id_model,failure_mode,potential_dtc,avg_cost_per_ei", {raw: true},function(err, data){
      if(err) throw err;
      else{
        console.log(data);
        res.send(data);
        // if you want to close client pool, uncomment redshift.close() line
        // but you won't be able to make subsequent calls because connection is terminated
        // redshift.close()
      }
    });
  });
app.listen(3000, function () {
  console.log('Warranty X.0 listening on port 3000!');
});

//   var redshift = new Redshift(clientConfiguration,{rawConnection: true});
//   redshift.rawQuery(`SELECT * FROM "pres_sandbox.warranty_ei"`, {raw: true})
// .then(function(data){
//   console.log(data); 
// })
// .catch(function(err){
//   console.log(err);
// });
//   redshift.query('SELECT * FROM pres_test.test_s3_lnd_load_metadata_core', function(err, rows, fields) {
//     if (err) throw err;
//     console.log(rows);
//     });
     
    //redshift.end();
 // using callbacks
// redshift.query('SELECT * FROM "pres_sandbox.warranty_ei"', {raw: true}, function(err, data){
//   if(err) throw err;
//   else{
//     console.log(data);

//     // if you want to close client pool, uncomment redshift.close() line
//     // but you won't be able to make subsequent calls because connection is terminated
//     // redshift.close();
//   }
// });

// app.use(express.static(__dirname + "/HTML_Files"));
// app.use(app.router);

  module.exports = router;
const PORT=8080; 

fs.readFile('./index.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});