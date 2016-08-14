var breaker;
var breakerContext;
var posX = 0;
var posY = 0;
var paddleBottomX = 250;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 7;
var ballSpeedY = 7;
var brickWidth = 75;
var brickHeight = 20;
var brickRowCount = 5;
var brickColumnCount = 13;
var brickPadding = 20;
var brickLeftOffSet = 30;
var brickTopOffSet = 60;
var score = 0;
var lives = 3;


// creating and initializing the brick object, for its x and y position with 0 value
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//this function gets called on mouse move
//return mouse pointer x & y coordinate
function paddleMove(evt) {
    var rect = breaker.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}


//this function gets called on document load
window.onload = function () {
    breaker = document.getElementById('breakerGame');
    breakerContext = breaker.getContext('2d');
    var framesPerSecond = 30;

    // method calls a function or evaluates an expression at specified intervals
    setInterval(function () {
        drawEverything();
        moveBall();
        drawBricks();
        collisionDetection();
        findScore();
        drawLives();
    }, 1000 / framesPerSecond);

    //this is an event which fires when mouse move is happened
    breaker.addEventListener('mousemove', function (evt) {
        var mousePos = paddleMove(evt);
        paddleBottomX = mousePos.x - (PADDLE_WIDTH / 2);
    });
};

function findScore() {
    breakerContext.font = "16px Arial";
    breakerContext.fillStyle = "#0095DD";
    breakerContext.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    breakerContext.font = "16px Arial";
    breakerContext.fillStyle = "#0095DD";
    breakerContext.fillText("Lives: " + lives, breaker.width - 65, 20);
}

//initializes the brick object variable x and y (position of brick). Bricks position to be drawn on canvas has been defined in this function.  
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickLeftOffSet;
                var brickY = (r * (brickHeight + brickPadding)) + brickTopOffSet;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                breakerContext.beginPath();
                rectColor(brickX, brickY, brickWidth, brickHeight, 'white');
                breakerContext.fill();
            }
        }
    }
}

// method called from setInterval, draws canvas and bottom paddle 	
function drawEverything() {
    rectColor(posX, posY, breaker.width, breaker.height, 'black');		// for black blank canvas 
    rectColor(paddleBottomX, breaker.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, 'white'); //for white bottom paddle
    circleColor(ballX, ballY, 10, 'red');
}

// method called within drawEverything, sets the xy position,height & width and color of the rectangle 
function rectColor(posX, posY, Width, Height, drawColor) {
    breakerContext.fillStyle = drawColor;
    breakerContext.fillRect(posX, posY, Width, Height);
}

function circleColor(centerX, centerY, radius, ballColor) {
    breakerContext.fillStyle = ballColor;
    breakerContext.beginPath();
    breakerContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    breakerContext.fill();
}

function resetBall() {
    ballX = breaker.width / 2;
    ballY = breaker.height - 100;
    paddleBottomX = (breaker.width - PADDLE_WIDTH) / 2;
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX > breaker.width) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > breaker.height) {
        if (ballX > paddleBottomX && ballX < paddleBottomX + PADDLE_WIDTH) {
            ballSpeedY = -ballSpeedY;
            var deltaY = ballX - (paddleBottomX + PADDLE_WIDTH / 2);
            ballSpeedX = deltaY * 0.35;
        }
        else {
            lives--;
            if (!lives) {
                alert("Game over");
                document.location.reload();
            }
            else {
                resetBall();
            }
        }
    }

}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (b.x < ballX && ballX < b.x + brickWidth && b.y < ballY && ballY < b.y + brickHeight) {
                    ballSpeedY = -ballSpeedY;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}