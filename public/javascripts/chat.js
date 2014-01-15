var s = io.connect();

s.on("connect", function () {});
s.on("disconnect", function (client) {});
s.on("S_to_C_message", function (data) {
	addMessage(data);
});

function sendMessage() {
	var msg = $("#message").val();
	$("#message").val("");
	s.emit("C_to_S_message", {value:msg});
}

function addMessage (data) {
	var msg = data.value.replace( /[!@$%<>'"&|]/g, '' );
	$("#msg_list").prepend("<div class='msg'>" + msg + "<br />TIME:" + data.svTime + "<br /> PORT:" + data.port + "</div>");
}    
