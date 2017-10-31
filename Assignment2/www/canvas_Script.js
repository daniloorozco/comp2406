var canvas = document.getElementById('canvas1'); //our drawing canvas
var ctx = canvas.getContext('2d');
let boxes = [];
/*function createStars(width,height, ctx, radius){
			ctx.beginPath();
			ctx.arc(radius + (Math.random() * width), radius + (Math.random() * height), radius*Math.random(), 0, Math.PI*2, false);
			
      var rand = Math.floor((Math.random()*10)+1);
      if(rand <= 5){
				  ctx.fillStyle = "rgba(255, 255, 255, 1)";
				  ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
				  ctx.shadowBlur = 4;
			}
			else if(rand > 8){
				  ctx.fillStyle = "rgba(255, 254, 196, 1)";
				  ctx.shadowColor = "rgba(255, 254, 196, 0.5)";
				  ctx.shadowBlur = 5; 
			}
		ctx.fill();
}*/

var draw_canvas = function(){
	//ctx.fillStyle="#000000";
	//ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle ="#ff0000";
	ctx.fillRect(20,20,100,100);
}

function handle_enter_session_button() {
   //get the user input
    var username = document.getElementById("userTextField1").value;
	var shipColour = document.getElementById("userTextField2").value;
}
					

//this function is run when the page loads
document.addEventListener("DOMContentLoaded",function(){
	
	//configure the canvas
	draw_canvas();
});





/*interval = setInterval(
      function(interval){
        createStars(canvas.width,canvas.height, ctx, 2);
      }
      , 1);

    setTimeout( // Stop sreating stars after 10s
      function(){ clearInterval(interval); }
      ,8000
    );
	canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;*/
	//draw the initial canvas
