// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8000; // set our port

var pg = require("pg");
//conString -> pg://username:password@server:port/database
var conString = "pg://root:teamstats@ldso10.fe.up.pt:5432/booktown";

var client = new pg.Client(conString);
client.connect();

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Access database....');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	//res.json({ message: 'hooray! welcome to our api!' });

    var query = client.query("Select * from states LIMIT 10");
    query.on("row", function (row, result) {
        result.addRow(row);
    });

    query.on("end", function (result) {
        console.log(JSON.stringify(result.rows, null, "    "));
        res.json({ message: result.rows });
    });




});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
