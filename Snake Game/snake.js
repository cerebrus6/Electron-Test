//Allow jQuery
window.$ = window.jQuery = require('jquery');

//SNAKE GAME

//Snake Picture
function playGame(x,y,dir) {

	$("#new_Game")
	.html("Snake")
	.attr("disabled", "true");

//Media Variables and Event Listeners
	var scream 		= new Audio();
		scream.src 	= 'scream.mp3';
	var colo 		= Col();
	var foodColo 	= Col();
	$(document).on("keydown", getDirection);

//Clear Snake Picture
	$("#canvas").css({"background-image":"none", "background-color":"black"});

//Canvas Properties
	var cnvs 	= document.getElementById("canvas");
	var ctx 	= cnvs.getContext("2d");
	var cnvsW 	= cnvs.width;
	var cnvsH 	= cnvs.height;

//Default Values
	var snakeW 		= 10;
	var snakeH 		= 10;
	var direction 	= dir;
	var snakeLen 	= 5;
	var initalPos	= 	{
						x : Math.round(Math.random()*(cnvsW/snakeW)),
						y : Math.round(Math.random()*(cnvsH/snakeH))
						};

//Score
	$("#score").html(`Score: ${snakeLen}`);

//Fooooooooooooooooooood Coordinates
	let food = {
		x : Math.round(Math.random()*(cnvsW/snakeW - 1)),
		y : Math.round(Math.random()*(cnvsH/snakeH - 1))
	};

//Controls
function getDirection(key) {
	if(key.keyCode == 37 && direction != "right") {
		direction = "left";
	}
	else if(key.keyCode == 38 && direction != "down") {
		direction = "up";	
	}
	else if(key.keyCode == 39 && direction != "left") {
		direction = "right";
	}
	else if(key.keyCode == 40 && direction != "up") {
		direction = "down";
	}
}

//Randomly Change Color Everytime Food is Eaten
function Col() {
	var color1 = Math.floor(Math.random() * 256); 
	var color2 = Math.floor(Math.random() * 256);
	var color3 = Math.floor(Math.random() * 256);
	var randomColor = "rgb(" + color1 + " , " + color3 + " , " + color2 + ")";
return randomColor
}

//Snake Building Blocks
function drawSnake(x,y,c) {
	ctx.fillStyle = c;
	ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
	ctx.fillStyle = "grey";
	ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
	}

//Initialize snake
	var snake = [];
	for (var i = snakeLen - 1; i>=0; i--) {
		snake.push ({x : x, y : y});
	}

//Draw Initial Food
function drawFood(x,y,c) {
	ctx.fillStyle = c;
	ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
	ctx.fillStyle = "white";
	ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
}

//Increase Score Everytime Food is Eaten
function score() {
	var score = snakeLen;
	for (; score <= snake.length; score++);
		$("#score").html(`Score: ${score}`);
}

//Animation
function draw() {
	
//Continuously Refresh Canvas to load the Snake Array
	ctx.clearRect(0,0,cnvsW,cnvsH);
	
//Create Snake Blocks according to the Length of the Snake Array
	for (var i = 0; i < snake.length; i++) {
		var x = snake[i].x;
		var y = snake[i].y;
		drawSnake(x,y,colo);
	}

//Draw Food
	drawFood(food.x, food.y, foodColo);

//Position of the Snake Head
	var snakeX = snake[0].x; 
	var snakeY = snake[0].y;

//Condition for making New Head
	if (direction == "left") snakeX--;
	else if (direction == "up") snakeY--;
	else if (direction == "right") snakeX++;
	else if (direction == "down") snakeY++;

//Pass Through Walls
	if (snakeX < 0) snakeX = cnvsW/snakeW; //Pass through left wall, appear on the right
	else if (snakeX >= cnvsW/snakeW) snakeX = 0; //Pass through right wall, appear on the left
	else if (snakeY < 0) snakeY = cnvsH/snakeH; //Pass through top wall, appear on the bottom
	else if (snakeY >= cnvsH/snakeH) snakeY = 0; //Pass through bottom wall, appear on the top

//New Head
	var newHead = {
				x : snakeX,
				y : snakeY
			}

//Eat
	if (snakeX == food.x && snakeY == food.y) {
		colo = foodColo;
		foodColo=Col();
		snook = 100-(snake.length*2);
		clearInterval(intrvl);
		intrvl = setInterval(draw, snook);
		food = {
			x : Math.round(Math.random()*(cnvsW/snakeW - 1)),
			y : Math.round(Math.random()*(cnvsH/snakeH - 1))
			};
		score();
	} else {
		snake.pop();
	}

//Keep returning false until there is a collision with the head and the body
function collision(head,body) {
for (i = 0; i < snake.length; i++) {
	if (head.x == body[i].x && head.y == body[i].y) {
		return true;
			}
		}
	return false;
	}

//playGame("1,2,")

function gameOver() {
	scream.play();
	clearInterval(intrvl);
	$("#new_Game_Button").html(`<button id='new_Game' onclick="playGame(${snakeX},${snakeY},'${direction}')">New Game</button>`);
}

//If there is a collision, then restart the game
	if (collision(newHead,snake)) {
			gameOver();
	}

//Continuosly Move Snake Head
	snake.unshift(newHead);

} //End of draw

//Initial Speed
	var snook = 100-(snake.length*2);
	var intrvl = setInterval(draw, snook);
}

//End of Script