$(function () {
    var sc = io.connect();

    function showStatus(msg) {
        $('<div class="list-group">').prependTo('#status')
            .append('<h4 class="list-group-item-heading">' + msg + '</h4>')
            .append('<p class="list-group-item-text">' + new Date() + '</p>')
            .append('<p class="list-group-item-text">transport:' + sc.socket.transport.name + '</p>')
            .append('<p class="list-group-item-text">sessid:' + sc.socket.transport.sessid + '</p>');
    }

    sc.on("connect", function () {
        showStatus('Connect.');
    });
    sc.on("disconnect", function () {
        showStatus('Disconnect.');
    });
    sc.on("connecting", function () {
        showStatus('Connecting.');
    });
    sc.on("connect_failed", function () {
        showStatus('Connect failed.');
    });
    sc.on("reconnecting", function () {
        showStatus('Reconnecting.');
    });
    sc.on("reconnect", function () {
        showStatus('Reconnected.');
    });

    // received real
    sc.on("S_to_C_real", function (data) {
        var txt = data.value.replace(/[!@$%<>'"&|]/g, ''),
            u = $('#' + data.sid);  // temp
        if (u.length === 0) {
            $('<div class="list-group">').prependTo('#realTextOut')
                .attr("id", data.sid)
                .append('<h4>' + data.sid + '</h4>')
                .append('<p>' + '</p>');
        }
        u = $('#' + data.sid);
        u.find('p').text(txt);
    });

    //bind button event
    $('#realText').keyup(function () {
        var msg = $("#realText").val();
        sc.emit("C_to_S_real", {value: msg});
    });
});
