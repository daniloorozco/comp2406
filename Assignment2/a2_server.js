var http = require('http');
var url = require('url'); 
var WebSocketServer = require('ws').Server; //provides web sockets
var ecStatic = require('ecstatic');  //provides static file server service
//var cli = require('clients');
var userCounter = 0;
var clients = {};
//static file server
var server = http.createServer(ecStatic({root: __dirname + '/www'}));
var storedPositions = [];
var usernames = {};
var ws = new WebSocketServer({server: server});
ws.on('connection', function(w) {
	userCounter++;
	var user = userCounter;
	console.log('Client connected, client #',user);
	//clients[user] = w;
	//w.id = user;
	//console.log(clients);
  w.on('message',function(msg) {
	  var dataObj = JSON.parse(msg);
	  for(let i = 0; i < dataObj.pos.length; i++) {
		storedPositions.push({x:dataObj.pos[i].x,y:dataObj.pos[i].y,col:dataObj.pos[i].col,name:dataObj.pos[i].name})
		usernames[dataObj.pos[i].name] = dataObj.pos[i].col;
	  }
	 console.log('message received from client ',dataObj);
	var returnObj = JSON.stringify(storedPositions);
	broadcast(returnObj);
  });
  w.on('close',function() {
	  console.log('closing connection');
  });
});

function broadcast(returnObj) {
  ws.clients.forEach(function(client) {
	if(client != ws) {
		client.send(returnObj);
		}
  });
}



server.listen(3000);
console.log("Hosted on http://localhost:3000/assignment2.html");