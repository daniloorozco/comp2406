var canvas = document.getElementById('canvas1'); //our drawing canvas
var ctx = canvas.getContext('2d');
/*var boxes = [{x:20,y:20,w:50,h:50},{x:150,y:20,w:50,h:50},{x:300,y:20,w:50,h:50}]; // box objects
boxes.push({x:450,y:20,w:50,h:50});
boxes.push({x:20,y:150,w:50,h:50});
boxes.push({x:150,y:150,w:50,h:50});
boxes.push({x:300,y:150,w:50,h:50});
boxes.push({x:450,y:150,w:50,h:50});
*/

//var boxBeingMoved;
//var clientMovingBox;
var connection = new WebSocket('ws://127.0.0.1:3000');
//var timer;
var user; 
var userColor;
var deltaX, deltaY; //location where mouse is pressed
connection.onopen = function () {
  
};

// Log errors
connection.onerror = function (error) {
  console.error('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function(e) {
	var q = JSON.parse(e.data);
	draw_rect(q.x,q.y,q.col);
	console.log("message from server",q);
	/*if(e.data[0].name != undefined && e.data[0].col != undefined) {
		users.push({name:e.data[0].name,color:e.data[0].col});
	}
	for(let i = 0; i < e.data.length; i++) {
		positions.push({x: e.data[i].x, y: e.data[i].y,col: e.data[i].col});
	}
	console.log("message from server ",e);
	draw_canvas();*/
};

//function to control the drawing of user pencil.
function draw_rect(x,y,col) {
	ctx.fillStyle = col;
	ctx.fillRect(x,y,20,20);
}

//function to create the inital canvas
var draw_canvas = function(){
	ctx.fillStyle="white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
}
function handleMouseDown(e){
	
	//get mouse location relative to canvas top left
	var rect = canvas.getBoundingClientRect();
    var canvasX = e.pageX - rect.left; //use jQuery event object pageX and pageY
    var canvasY = e.pageY - rect.top;
	console.log("mouse down:" + canvasX + ", " + canvasY);
	
	//if the user hasnt entered in information then dont execute this code
	if(user != undefined && userColor != undefined){
	   //sets the mouse x and y 
	   deltaX = canvasX;
	   deltaY = canvasY;
	   var dataObj = {x:canvasX,y:canvasY,name:user,col:userColor};
	   connection.send(JSON.stringify(dataObj)); //sends the image position to websocket
	$("#canvas1").mousemove(handleMouseMove);
	$("#canvas1").mouseup(handleMouseUp);   
	}
	
    // Stop propagation of the event and stop any default 
    //  browser action
    e.stopPropagation();
    e.preventDefault();
	}
	
function handleMouseMove(e){
	
	console.log("mouse move");
	
	//get mouse location relative to canvas top left
	var rect = canvas.getBoundingClientRect();
    var canvasX = e.pageX - rect.left;
    var canvasY = e.pageY - rect.top;
	var dataObj = {x:canvasX,y:canvasY,name:user,col:userColor};
	connection.send(JSON.stringify(dataObj)); // send the message to websocket
	e.stopPropagation();
	}
	
function handleMouseUp(e){
	console.log("mouse up");
  		
	e.stopPropagation();

	//remove mouse move and mouse up handlers but leave mouse down handler
    $("#canvas1").off("mousemove", handleMouseMove); //remove mouse move handler
    $("#canvas1").off("mouseup", handleMouseUp); //remove mouse up handler
	}
	
//JQuery Ready function -called when HTML has been parsed and DOM
//created
//can also be just $(function(){...});
//much JQuery code will go in here because the DOM will have been loaded by the time
//this runs

function handle_enter_session_button() {
   //get the user input
    var username = document.getElementById("userTextField1").value;
	var color = document.getElementById("userTextField2").value;
	if(username && username != '') {
		if(color && color != '') {
			//process the username and colour and store it
				var obj = {client: username , userColor: color}
				user = obj.client;
				userColor = obj.userColor;
				console.log(username);
				console.log(userColor);
				objJSON = JSON.stringify(obj);
				document.getElementById("userTextField1").value = '';
				document.getElementById("userTextField2").value = '';
				users.push(obj); 
		}
	}
	

}				

//this function is run when the page loads
$(document).ready(function(){
	//add mouse down listener to our canvas object
	$("#canvas1").mousedown(handleMouseDown);
	$(document).onclick = function(){handle_enter_session_button};
	//configure the canvas
	draw_canvas();
});

