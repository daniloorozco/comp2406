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
var users = [];
var positions = [];
var deltaX, deltaY; //location where mouse is pressed
var objJSON;
connection.onopen = function () {
  
};

// Log errors
connection.onerror = function (error) {
  console.error('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function(e) {
	if(e.data[0].name != undefined && e.data[0].col != undefined) {
		users.push({name:e.data[0].name,color:e.data[0].col});
	}
	for(let i = 0; i < e.data.length; i++) {
		ctx.fillStyle = e.data[i].col;
		ctx.fillRect(e.data[i].x,e.data[i].y,20,20)
		//positions.push({x: e.data[i].x, y: e.data[i].y,col: e.data[i].col});
	}
	console.log("message from server ",e);
};


var draw_canvas = function(){
	ctx.fillStyle="white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	if(positions.length > 0) {
		for(let x = 0; x < positions.length; x++) {
			if(positions[x].col != undefined) {
				ctx.fillStyle = positions[x].col;
				ctx.fillRect(positions[x].x,positions[x].y,20,20);
				console.log(positions[x].x," ",positions[x].y," ",positions[x].col);
			}
		}
		
		
	}
}
function handleMouseDown(e){
	
	//get mouse location relative to canvas top left
	var rect = canvas.getBoundingClientRect();
    //var canvasX = e.clientX - rect.left;
    //var canvasY = e.clientY - rect.top;
    var canvasX = e.pageX - rect.left; //use jQuery event object pageX and pageY
    var canvasY = e.pageY - rect.top;
	console.log("mouse down:" + canvasX + ", " + canvasY);
	
	//console.log(wordBeingMoved.word);
	
	if(user != undefined && userColor != undefined){
	   deltaX = canvasX; 
	   deltaY = canvasY;
	   positions.push({x:deltaX,y:deltaY,col:userColor,name:user});
	$("#canvas1").mousemove(handleMouseMove);
	$("#canvas1").mouseup(handleMouseUp);   
	}
	
    // Stop propagation of the event and stop any default 
    //  browser action
    e.stopPropagation();
    e.preventDefault();
	draw_canvas();
	}
	
function handleMouseMove(e){
	
	console.log("mouse move");
	
	//get mouse location relative to canvas top left
	var rect = canvas.getBoundingClientRect();
    var canvasX = e.pageX - rect.left;
    var canvasY = e.pageY - rect.top;
	if(user != undefined && userColor != undefined){
		positions.push({x:canvasX,y:canvasY,col:userColor,name:user});
	}
	e.stopPropagation();
	draw_canvas();
	}
	
function handleMouseUp(e){
	console.log("mouse up");
  		
	e.stopPropagation();
	
    //$("#canvas1").off(); //remove all event handlers from canvas
    //$("#canvas1").mousedown(handleMouseDown); //add mouse down handler

	//remove mouse move and mouse up handlers but leave mouse down handler
    $("#canvas1").off("mousemove", handleMouseMove); //remove mouse move handler
    $("#canvas1").off("mouseup", handleMouseUp); //remove mouse up handler
	var objJSON = JSON.stringify({pos:positions});
	if(positions.length > 0) { 
		connection.send(objJSON);
	}	
	draw_canvas(); //redraw the canvas
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

