/*
Module does following
keeps track of all clients
checks if a client is contained
adds clients
returns array of clients
*/


var clients = {};

exports = function clientContained(id) {
	if(id in clients) {
		return true;
	}
	else {
		return false;
	}
}
exports = function addClients(id,webaddress) {
	clients[id] = webaddress;
}

exports = function getClients() {return clients;}
