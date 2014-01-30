$(function () {
    var sc = io.connect();

    function logStatus(eventName, status, transport, datetime) {
		var tp = transport || sc.socket.transport,
			dt = datetime || new Date();
        // status in [ undefined, success, active, warning, danger ]
        status = status || "";
        // add log
        $('<tr>').addClass(status).prependTo('#status')
            .append('<td>' + eventName + '</td>')
            .append('<td>' + status + '</td>')
            .append('<td>' + dt.toLocaleTimeString() + '</td>')
            .append('<td>' + tp.name + '</td>')
            .append('<td>' + tp.sessid + '</td>');
        return eventName;
    }
    sc.on("connecting", function () {
        logStatus('Connecting.');
        $('#busy').show();
    });
    sc.on("connect", function () {
        logStatus('Connect.', 'success');
        $('#busy').hide();
    });
    sc.on("connect_failed", function () {
        logStatus('Connect failed.', 'danger');
    });
    sc.on("disconnect", function () {
        logStatus('Disconnect.', 'danger');
    });
    sc.on("reconnecting", function () {
        logStatus('Reconnecting.');
        $('#busy').show();
    });
    sc.on("reconnect", function () {
        logStatus('Reconnected.', 'success');
        $('#busy').hide();
    });
    sc.on("S_Connect", function (data) {
        logStatus(data.value);
    });
    // received message
    sc.on("S_to_C_message", function (data) {
        var msg = data.value.replace(/[!@$%<>'"&|]/g, '');
        logStatus('recieve message.');
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
