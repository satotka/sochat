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

    // received message
    sc.on("S_to_C_message", function (data) {
        var msg = data.value.replace(/[!@$%<>'"&|]/g, '');
        $('<div class="list-group">').prependTo('#msg_list')
            .append('<h3 class="list-group-item-heading">' + msg + '</h3>')
            .append('<p class="list-group-item-text">' + data.svTime + '</p>');
    });

    // send message
    function sendMessage() {
        var msg = $("#message").val();
        $("#message").val("");
        sc.emit("C_to_S_message", {value: msg});
    }

    //bind button event
    $('#btnSendMsg').on("click", function () {
        sendMessage();
    });
});
