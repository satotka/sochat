$(function () {
    var sc = io.connect();

    function getStatusMessage(transport, datetime) {
		var tp = transport || sc.socket.transport,
			dt = datetime || new Date(),
			msg = dt.toLocaleTimeString() +	' [ ' + tp.name + ' ] ' + tp.sessid;
        return msg;
    }

    function showStatus(eventName, msg) {
        $('<div class="list-group">').prependTo('#status')
            .append('<h5 class="list-group-item-heading">' + eventName + '</h5>')
            .append('<p class="list-group-item-text">' + msg + '</p>');
    }

    sc.on("connecting", function () {
        var eventName = 'Connecting.';
        showStatus(eventName, getStatusMessage());
        alertify.log(eventName);
    });
    sc.on("connect", function () {
        var eventName = 'Connect.';
        showStatus(eventName, getStatusMessage());
        alertify.success(eventName);
        $('#btnSendMsg').removeClass('disabled');
    });
    sc.on("connect_failed", function () {
        var eventName = 'Connect failed.';
        showStatus(eventName, getStatusMessage());
        alertify.error(eventName);
        $('#btnSendMsg').addClass('disabled');
    });
    sc.on("disconnect", function () {
        var eventName = 'Disconnect.';
        showStatus(eventName, getStatusMessage());
        alertify.error(eventName);
        $('#btnSendMsg').addClass('disabled');
    });
    sc.on("reconnecting", function () {
        var eventName = 'Reconnecting.';
        showStatus(eventName, getStatusMessage());
        alertify.error(eventName);
        $('#btnSendMsg').addClass('disabled');
    });
    sc.on("reconnect", function () {
        var eventName = 'Reconnected.';
        showStatus(eventName, getStatusMessage());
        alertify.success(eventName);
        $('#btnSendMsg').removeClass('disabled');
    });
    sc.on("S_Connect", function (data) {
        var eventName = data.value;
        showStatus(eventName, getStatusMessage());
        alertify.success(eventName);
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
