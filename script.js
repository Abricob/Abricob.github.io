/*
	
	We initialize the animation with init() which draws two major lines and at the end
	of its code invokes the lines function. Each time the lines function is called 
	two new lines are drawn on the endings of previous ones. Their length and width are
	stored in the length and width variables respectively, while the angle is the number
	of degrees at which the line will diverge. Length and width of lines are multiplied
	by ratio (which varies from 0.65 to 0.75 so it gives 65%-75% of the previous value)
	each time lines function is invoked so that both length and width decrease at the same
	ratio. Arrays (arr1,arr2,arr3,arr4) store line endpoints. End points of current lines
	are starting points for the next ones as the lines function clears the arrays and stores
	new values on each invocation. Finally, the endPoint function which is based on simple
	vectors calculates the new ending point given the previous x and y position, angle
	(converts it to radians) and length (magnitude). Consider an end point a simple point
	with x and y properties.
	======================================================================================
	

	
    Put the entire code in the onload event to make sure everything has loaded on the page
	before interacting with the DOM.
*/

window.onload = function() {

	var canvas = document.getElementById("canvas"), 
	ctx = canvas.getContext('2d'), length, angle, ratio, width,
	arr1 = [], arr2 = [], arr3 = [], arr4 = [], // these arrays will be cleared and re-populated
	                                            // with ending points, whenever lines() is called
	h = window.innerHeight, w = window.innerWidth, blue;
	//fit canvas to screen
	w=200;
	h=200;
	canvas.width = w;
	canvas.height = h;
	
	
	function init() {
		//light gray background
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, w, h);
		length =  25;
		angle = 30 + Math.floor(Math.random() * 30);
		ratio = Math.round(65 + 10)/100;
		width = 3;
		blue = 2; 
		
		//ending points of the two biggest starting lines
		var north = {x: w/2, y: h/2, angle: 90+Math.random() * 50}, south = {x: w/2 , y: h/2, angle: -90+Math.random() * 50},
			 east = {x: w/2, y: h/2, angle: 0+Math.random() * 50}, west = {x: w/2 , y: h/2 , angle: -180+Math.random() * 50};
		
		arr1 = []; arr2 = []; arr3 = []; arr4 = []; //clear the stored ending points
		arr1.push(north); // these points become the starting points for additional lines
		arr2.push(south);
		arr3.push(east);
		arr4.push(west);
		
		// draw the two major lines
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(0,0,0'; // set line color to a light shade of blue
		ctx.shadowOffsetX = 12;
		ctx.shadowOffsetY = 12;
		ctx.shadowBlur    = 7;
		ctx.shadowColor   = "black";
		ctx.lineWidth = width;
		ctx.moveTo(south.x, h-south.y);
		ctx.lineTo(north.x, h-north.y);
		ctx.moveTo(east.x, h-east.y);
		ctx.lineTo(west.x, h-west.y);
		ctx.stroke();
		
		lines();
	}
	
	function lines() {
		length *= ratio; // reduce line size
		width *= ratio; // reduce the line width
		ctx.lineWidth = width;
		var newarr1 = [], newarr2 = [], newarr3 = [], newarr4 = []; // new ending points
		blue -= 10;
		
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.shadowOffsetX = 12;
		ctx.shadowOffsetY = 12;
		ctx.shadowBlur    = 7;
		ctx.shadowColor   = "gray";
		for(var i = 0, currLength = arr1.length; i < currLength; i++) {
			
			var t1 = arr1[i], t2 = arr2[i], t3 = arr3[i], t4 = arr4[i];
			
			var e1 = endPoint(t1.x, t1.y, t1.angle+angle, length);
			var e2 = endPoint(t1.x, t1.y, t1.angle-angle, length);
			ctx.moveTo(t1.x, h-t1.y);
			ctx.lineTo(e1.x, h-e1.y);
			ctx.moveTo(t1.x, h-t1.y);
			ctx.lineTo(e2.x, h-e2.y);
			e1.angle = t1.angle+angle;
			e2.angle = t1.angle-angle;
			newarr1.push(e1, e2);
			
			var e3 = endPoint(t2.x, t2.y, t2.angle+angle, length);
			var e4 = endPoint(t2.x, t2.y, t2.angle-angle, length);
			ctx.moveTo(t2.x, h-t2.y);
			ctx.lineTo(e3.x, h-e3.y);
			ctx.moveTo(t2.x, h-t2.y);
			ctx.lineTo(e4.x, h-e4.y);
			e3.angle = t2.angle+angle;
			e4.angle = t2.angle-angle;
			newarr2.push(e3, e4);
			
			
			
		
			
		}
		ctx.stroke();
		arr1 = newarr1; arr2 = newarr2; arr3 = newarr3; arr4 = newarr4; // set old ending points to new ones
		
		// recursively draw new lines if length of the line is bigger than 4, otherwise
		// initialize the animation again after 1000ms (1 second) delay.
		if(length > 2) setTimeout(lines, 50);
		else setTimeout(init, 700);
	}
	
	function endPoint(x, y, a, l) {
		// new x coordinate
		var newX = x + l * Math.cos(a*Math.PI/180);
		// new Y end point
		var newY = y + l * Math.sin(a*Math.PI/180);
		// return new ending point as an object with x and y properties.
		// A vector constructor function could be used as well, but in
		// order not to complicate things let's return a new object literal
		return {x: newX, y: newY};
	}
	
	//We are set to go
	init();
	
};



/*
		Vector constructor example with some methods
		============================================
		function Vector(x, y) {
			this.x = x;
			this.y = y;
		}
		
		Vector.prototype.add = function(v) {
			return new Vector(this.x + v.x, this.y + v.y);
		};
		
		Vector.prototype.magnitude = function() {
			return Math.sqrt(this.x * this.x, this.y * this.y);
		};
		
		...
		
		usage
		
		var p = new Vector(100, 100);
		p.magnitude();
		
*/
