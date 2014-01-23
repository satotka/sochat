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
  res.render('index', { title: 'Express' });
});
app.get('/chat', chat.show);
app.get('/realchat', chat.realshow);

var srv = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = socketio.listen(srv);
io.sockets.on("connection", function (socket) {
  console.log("A socket connected. " + socket.id);
  socket.on("C_to_S_message", function (data) {
    io.sockets.emit("S_to_C_message", {value: data.value, svTime: new Date()});
  });
  socket.on("C_to_S_real", function(data) {
    io.sockets.emit("S_to_C_real", {value: data.value, svTime: new Date(), sid: socket.id});
  });
  socket.on("disconnect", function () {
    console.log("A socket disconnect. " + socket.id);
  });
});