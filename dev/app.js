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

app.get('/api/get-userinfo', function (request, response) {

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT firstname, lastname, img FROM login Where id = $1', [request.user.id] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });

});

// ================================================== All Players Page ==================================================

app.get('/api/get-teams', function (request, response) {

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT team.id, team.name, team.img, team.ended FROM login_team, team '+
            'WHERE login_team.id_login = $1 AND login_team.id_team = team.id', [request.user.id] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });

});

app.get('/api/get-players', function (request, response) {

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT team.id AS team, player.id as player, player.name, ' +
            'substring(player.name from \'[a-zA-Z]+\') as firstname, substring(player.name from \' [a-zA-Z]+$\') as lastname, ' +
            'coalesce(date_part(\'year\', age(current_date ,player.birth_date)),0) as age, player.condition, player.img ' +
            'FROM login_team, team, player, team_player WHERE login_team.id_login = $1 AND login_team.id_team = team.id ' +
            'AND team_player.id_team = team.id AND team_player.id_player = player.id ORDER BY team.id, player.name', [request.user.id] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });

});

// ================================================== Team Overview ==================================================

app.get('/api/get-teamsGames', function (request, response) {

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT team.id AS team_id, game.id, game.date, game. title ' +
            'FROM login_team, team, game ' +
            'WHERE login_team.id_login = $1 ' +
            'AND team.id = login_team.id_team AND game.id_team = team.id ' +
            'ORDER BY team.id, game.date DESC', [request.user.id] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });

});

app.get('/api/get-teamsStatsBlock', function (request, response) {

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT game.id AS game_id, stat_block.id, stat_block.title ' +
            'FROM login_team, team, game, stat_block ' +
            'WHERE login_team.id_login = $1 ' +
            'AND team.id = login_team.id_team AND game.id_team = team.id ' +
            'AND stat_block.id_game = game.id', [request.user.id] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });

});

app.get('/api/get-teamsStatsLine', function (request, response) {

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT stat_block.id AS block, stat_line.id, stat_line.field, stat_line.value ' +
            'FROM login_team, game, stat_block, stat_line, team ' +
            'WHERE login_team.id_login = $1 ' +
            'AND login_team.id_team = game.id_team AND team.id = login_team.id_team ' +
            'AND stat_block.id_game = game.id AND stat_line.id_stat_block = stat_block.id ' +
            'ORDER BY stat_block.id', [request.user.id] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });

});

// ================================================== Player Page ==================================================

app.get('/api/get-playerInfo', function (request, response) {

    var playerID = request.param("playerID")

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT player.* ' +
            'FROM login_team, team_player, player ' +
            'WHERE login_team.id_login = $1 AND login_team.id_team = team_player.id_team ' +
            'AND team_player.id_player = $2 AND team_player.id_player = player.id', [request.user.id, playerID] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});

app.get('/api/get-playerStaticBlocks', function (request, response) {

    var playerID = request.param("playerID")

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT info_block.id, info_block.title ' +
            'FROM login_team, team_player, info_block ' +
            'WHERE login_team.id_login = $1 AND login_team.id_team = team_player.id_team ' +
            'AND team_player.id_player = $2 AND info_block.id_player = team_player.id_player ' +
            'AND info_block.type = \'static\' ORDER BY info_block.id', [request.user.id, playerID] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});

app.get('/api/get-playerStaticLines', function (request, response) {

    var playerID = request.param("playerID")

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT info_line.id, info_line.id_info_block AS block, info_line.field, info_line.value ' +
            'FROM login_team, team_player, info_block, info_line ' +
            'WHERE login_team.id_login = $1 AND login_team.id_team = team_player.id_team ' +
            'AND team_player.id_player = $2 AND info_block.id_player = team_player.id_player ' +
            'AND info_block.type = \'static\' AND info_line.id_info_block = info_block.id ORDER BY info_line.id', [request.user.id, playerID] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});

app.get('/api/get-playerDynamicBlocks', function (request, response) {

    var playerID = request.param("playerID")

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT info_block.id, info_block.title ' +
            'FROM login_team, team_player, info_block ' +
            'WHERE login_team.id_login = $1 AND login_team.id_team = team_player.id_team ' +
            'AND team_player.id_player = $2 AND info_block.id_player = team_player.id_player ' +
            'AND info_block.type = \'dynamic\' ORDER BY info_block.id', [request.user.id, playerID] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});

app.get('/api/get-playerDynamicLines', function (request, response) {

    var playerID = request.param("playerID")

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT info_line.id, info_line.id_info_block AS block, info_line.field, info_line.value, info_line.date ' +
            'FROM login_team, team_player, info_block, info_line ' +
            'WHERE login_team.id_login = $1 AND login_team.id_team = team_player.id_team ' +
            'AND team_player.id_player = $2 AND info_block.id_player = team_player.id_player ' +
            'AND info_block.type = \'dynamic\' AND info_line.id_info_block = info_block.id ORDER BY info_line.date, info_line.field ASC', [request.user.id, playerID] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});

app.get('/api/get-playerDynamicFields', function (request, response) {

    var playerID = request.param("playerID")

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT DISTINCT info_line.id_info_block AS block, info_line.field ' +
            'FROM login_team, team_player, info_block, info_line ' +
            'WHERE login_team.id_login = $1 AND login_team.id_team = team_player.id_team ' +
            'AND team_player.id_player = $2 AND info_block.id_player = team_player.id_player ' +
            'AND info_block.type = \'dynamic\' AND info_line.id_info_block = info_block.id ' +
            'ORDER BY block, field ASC', [request.user.id, playerID] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});

app.get('/api/get-playerDynamicDates', function (request, response) {

    var playerID = request.param("playerID")

    pg.connect(conString, function(err, client, done) {
        client.query('SELECT DISTINCT info_block.id AS block, info_line.date ' +
            'FROM login_team, team_player, info_block, info_line ' +
            'WHERE login_team.id_login = $1 AND login_team.id_team = team_player.id_team ' +
            'AND team_player.id_player = $2 AND info_block.id_player = team_player.id_player ' +
            'AND info_block.type = \'dynamic\' AND info_line.id_info_block = info_block.id ' +
            'ORDER BY info_line.date', [request.user.id, playerID] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});

app.post('/api/update-playerName', function (request, response) {

    var playerID = request.param("playerID")
    var name = request.param("name")

    pg.connect(conString, function(err, client, done) {
        client.query('UPDATE player SET name = $3 WHERE id = ' +
            '(SELECT team_player.id_player FROM login_team, team_player WHERE login_team.id_login = $1 AND login_team. id_team = team_player.id_team ' +
            'AND team_player.id_player = $2)', [request.user.id, playerID, name] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.status(200).end(); }
        });
    });
});

app.post('/api/update-playerPhone', function (request, response) {

    var playerID = request.param("playerID")
    var phone = request.param("phone")

    pg.connect(conString, function(err, client, done) {
        client.query('UPDATE player SET phone = $3 WHERE id = ' +
            '(SELECT team_player.id_player FROM login_team, team_player WHERE login_team.id_login = $1 AND login_team. id_team = team_player.id_team ' +
            'AND team_player.id_player = $2)', [request.user.id, playerID, phone] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.status(200).end(); }
        });
    });
});

app.post('/api/update-playerBirth', function (request, response) {

    var playerID = request.param("playerID")
    var birth_date = request.param("birth")

    pg.connect(conString, function(err, client, done) {
        client.query('UPDATE player SET birth_date = $3 WHERE id = ' +
            '(SELECT team_player.id_player FROM login_team, team_player WHERE login_team.id_login = $1 AND login_team. id_team = team_player.id_team ' +
            'AND team_player.id_player = $2)', [request.user.id, playerID, birth_date] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.status(200).end(); }
        });
    });
});

app.post('/api/insert-staticBlock', function (request, response) {

    var playerID = request.param("playerID")
    var title = request.param("title")

    pg.connect(conString, function(err, client, done) {
        client.query('INSERT INTO info_block(id_player, title, type, is_default) ' +
            'VALUES ( ' +
            '(SELECT team_player.id_player FROM login_team, team_player ' +
            'WHERE login_team.id_login = $1 AND login_team. id_team = team_player.id_team ' +
            'AND team_player.id_player = $2) ' +
            ', $3, \'static\', false) RETURNING id', [request.user.id, playerID, title] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});

app.post('/api/insert-staticLine', function (request, response) {

    var blockID = request.param("blockID")
    var field = request.param("field")
    var value = request.param("value")

    pg.connect(conString, function(err, client, done) {
        client.query('INSERT INTO info_line(id_info_block, field, value) ' +
            'VALUES ((SELECT info_block.id FROM login_team, team_player, info_block ' +
            'WHERE login_team.id_login = $1 AND login_team. id_team = team_player.id_team ' +
            'AND team_player.id_player = info_block.id_player AND info_block.id = $2), $3, $4) RETURNING id', [request.user.id, blockID, field, value] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});

app.post('/api/delete-staticLine', function (request, response) {

    var lineID = request.param("lineID")

    pg.connect(conString, function(err, client, done) {
        client.query('DELETE FROM info_line WHERE id = (SELECT info_line.id FROM login_team, team_player, info_block, info_line ' +
            'WHERE login_team.id_login = $1 AND login_team. id_team = team_player.id_team ' +
            'AND team_player.id_player = info_block.id_player AND info_block.id = info_line.id_info_block ' +
            'AND info_line.id = $2)', [request.user.id, lineID] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});

app.post('/api/update-staticLine', function (request, response) {

    var lineID = request.param("lineID")
    var value = request.param("value")

    pg.connect(conString, function(err, client, done) {
        client.query('UPDATE info_line SET value = $3 WHERE id = ' +
            '(SELECT info_line.id FROM login_team, team_player, info_block, info_line ' +
            'WHERE login_team.id_login = $1 AND login_team. id_team = team_player.id_team ' +
            'AND team_player.id_player = info_block.id_player AND info_block.id = info_line.id_info_block ' +
            'AND info_line.id = $2)', [request.user.id, lineID, value] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});

app.post('/api/delete-infoBlock', function (request, response) {

    var blockID = request.param("blockID")

    pg.connect(conString, function(err, client, done) {
        client.query('DELETE FROM info_block WHERE id = ' +
            '(SELECT info_block.id FROM login_team, team_player, info_block WHERE login_team.id_login = $1 AND login_team. id_team = team_player.id_team ' +
            'AND team_player.id_player = info_block.id_player AND info_block.id = $2)', [request.user.id, blockID] ,function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
});


// ==================================================================================================================================

app.post('/api/add-player', function (request, response) {
    
    var name = $scope.master.name;
    var birth = $scope.master.birth;
    var phone = $scope.master.phone;
        
    pg.connect(conString, function(err, client, done) {
        client.query('INSERT INTO player(name, birth_date, phone) VALUES($1,$2,$3); ', 
        [name,birth,phone], function(err, result) {
            done();
            if (err)
            { console.error(err); response.json(err); }
            else
            { response.send(); }
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


