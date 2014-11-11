var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//sha256
var crypto = require('crypto');

//Tokens
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var pg = require("pg");

//conString -> pg://username:password@server:port/database
//var conString = "postgres://ohvgctbdgijnjk:MYqBzVTqdaUn-6hjEXgsZxlJlo@ec2-54-235-99-46.compute-1.amazonaws.com:5432/ddphlm2hsa5h6a"; //Ligação à base de dados no Heroku
var conString = "postgres://ldso:ldso@localhost:5432/team_stats";

var port     = process.env.PORT || 3000; // set our port


var secret_key = 'shhhhhhared-secret';



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: secret_key}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// ================================ DATABASE ACCESS ================================

app.get('/players', function (request, response) {
    pg.connect(conString, function(err, client, done) {
        client.query('SELECT * FROM player', function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});

app.post('/register-user', function (request, response) {
    var email = request.body.email;
    var password = crypto.createHash('sha256').update(request.body.password).digest("hex");
    var firstname = request.body.firstname, lastname = request.body.lastname;

    pg.connect(conString, function(err, client, done) {
        client.query('INSERT INTO login(email, password, firstname, lastname) VALUES($1, $2, $3, $4)', [email, password, firstname, lastname], function(err, result) {
            done();
            if (err)
            { console.error(err); response.json(err); }
            else
            { response.send(); }
        });
    });

});

app.post('/authenticate', function (request, response) {
    //TODO validate req.body.username and req.body.password

    var email = request.body.email;
    var password = crypto.createHash('sha256').update(request.body.password).digest("hex");
    var id = -1;

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT id FROM login WHERE email=$1 AND password=$2', [email, password], function(err, result) {
            done();
            if (err)
            { console.error(err); response.json(err); }
            else{
                if(result.rows[0])
                    id = result.rows[0].id;

                //if is invalid, return 401
                if (id <= 0) {
                    response.send(401, 'Wrong user or password');
                    return;
                }

                var profile = {
                    id: id
                };

                // We are sending the profile inside the token
                var token = jwt.sign(profile, secret_key, { expiresInMinutes: 60*5 });

                response.json({ token: token });
            }
        });
    });

});

/*
app.get('/api/restricted', function (req, res) {
    console.log('user ' + req.user.email + ' is calling /api/restricted');
    res.json({
        name: 'foo'
    });
});*/

app.get('/api/get-userinfo', function (request, response) {
    console.log(request.user);
    pg.connect(conString, function(err, client, done) {
        client.query('SELECT firstname, lastname, img FROM login Where id = $1', [ request.user.id] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });

});

// ====================================================================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;

