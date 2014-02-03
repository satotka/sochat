/*
 * manage socket.io connections.
 */
var socketio = require('socket.io');

var list = {
    sessions:[],
    count: 0,
    addConn: function (socket) {
        var id = socket.id;
        list[id] = 'connected';
        list.count += 1;
        console.log("A socket connected. " + id);
        console.log("Socket count    : " , list.count);
    },
    delConn: function (socket) {
        var id = socket.id;
        list[id] = 'disconnect';
        list.count -= 1;
        console.log("A socket disconnected. " + id);
        console.log("Socket count    : " , list.count);
    }
};

function setup(srv){
    var io = socketio.listen(srv);
    io.sockets.on("connection", function (socket) {
        //console.log('test print:'+ socket.manager.server.connections);
        list.addConn(socket); // testing.

        // send connect message to clients.
        io.sockets.emit("S_Connect", {value: 'someone connect', svTime: new Date()});

        socket.on("C_to_S_message", function (data) {
            // send message to all clients.
            io.sockets.emit("S_to_C_message", {value: data.value, svTime: new Date()});
        });

        socket.on("disconnect", function () {
            list.delConn(socket); // testing.
        });
    });
}

exports.setup = setup;
