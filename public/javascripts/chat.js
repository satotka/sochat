var s = io.connect();
//var s = io.connect('http://localhost:3000');

s.on("connect", function () {});
s.on("disconnect", function (client) {});
s.on("S_to_C_message", function (data) {
	addMessage(data.value);
});

function sendMessage() {
	var msg = $("#message").val();
	$("#message").val("");
	s.emit("C_to_S_message", {value:msg});
}

function addMessage (value,color,size) {
	var msg = value.replace( /[!@$%<>'"&|]/g, '' );
	$("#msg_list").prepend("<div class='msg'>" + msg + "</div>");
}    
