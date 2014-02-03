/*
 * manage connections.
 */
var list = {
    sessions:[],
    count: 0,
    addConn: function (socket) {
        var id = socket.id;
        list[id] = 'connected';
        list.count += 1;
        console.log("A socket connected. " + id);
        console.log("A socket count    . " + list.count);
    },
    delConn: function (socket) {
        var id = socket.id;
        list[id] = 'disconnect';
        list.count -= 1;
        console.log("A socket disconnected. " + id);
        console.log("A socket count       . " + list.count);
    }
};

exports.Connections = list;
