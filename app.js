/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// routings.
app.get('/', function (req, res) {
    res.render('index', { title: 'sochat' });
});
app.get('/chat', function (req, res) {
    res.render('chat', {title: 'Simple Chat'});
});
app.get('/m_chat', function (req, res) {
    res.render('m_chat', {title: 'Simple Chat'});
});

var srv = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

//manage socket connections.
var socketconn = require('./connections');
socketconn.setup(srv);
