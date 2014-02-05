/**
 * Module dependencies.
 */

var express = require('express');
var chat = require('./routes/chat');
var http = require('http');
var path = require('path');

var socketio = require('socket.io');

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

app.get('/', function(req, res){
    res.render('index', { title: 'sochat' });
});
app.get('/chat', chat.show);
app.get('/m_chat', chat.m_show);

var srv = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

var io = socketio.listen(srv);
io.sockets.on("connection", function (socket) {
	var member = [];
    console.log("A socket connected. " + socket.id);
	mamber.push(socket.id);
    io.sockets.emit("S_Connect", {value: 'someone connect', svTime: new Date()});
    socket.on("C_to_S_message", function (data) {
        io.sockets.emit("S_to_C_message", {value: data.value, svTime: new Date()});
    });
    socket.on("disconnect", function () {
        console.log("A socket disconnect. " + socket.id);
    });
});