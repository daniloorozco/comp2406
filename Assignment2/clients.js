/*
Module does following
keeps track of all clients
checks if a client is contained
adds clients
returns array of clients
*/


var clients = {};
module.exports = {
	getClients: function() {
		return clients;
		},
	addClients: function(id,webaddress) {
		clients[id] = webaddress;
	},
	clientContained: function(id) {
		if(id in clients) {
			return true
		}
		return false;
	}
}