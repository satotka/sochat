var s = io.connect();

s.on("connect", function () {
	con();
});
s.on("disconnect", function (client) {
	discon();
});
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
	$('<div class="list-group">').prependTo('#msg_list')
		.append('<h3 class="list-group-item-heading">'+ msg +'</h3>')
		.append('<p class="list-group-item-text">'+ data.svTime +':' +data.port +'</p>')
}    
function con() {
	var msg = 'Connect.';
	$('<div class="list-group">').prependTo('#msg_list')
		.append('<h4 class="list-group-item-heading">'+ msg +'</h4>');
}    
function discon() {
	var msg = 'Disconnect.';
	$('<div class="list-group">').prependTo('#msg_list')
		.append('<h4 class="list-group-item-heading">'+ msg +'</h4>');
}    
