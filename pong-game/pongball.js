		var player1Score = 0;
        var player2Score = 0;    
        var canvas;
		var canvasContext;
        var ballX = 50;
        var ballY = 50;
        var ballSpeedX = 10;
        var ballSpeedY = 10;
        var showWinScreen = false;
        var paddleLeftY = 250;
        var paddleRightY = 250;
        const PADDLE_HEIGHT = 100;
        const PADDLE_THICKNESS = 10;
        const WINNING_SCORE = 3;
        
        function calculateMousePos(evt){
            var rect = canvas.getBoundingClientRect();
            var root = document.documentElement;
            var mouseX = evt.clientX - rect.left - root.scrollLeft;
            var mouseY = evt.clientY - rect.top - root.scrollTop;
            return{
                x:mouseX,
                y:mouseY
            };
        }
        
        function handleWinScreen(evt){
                if(showWinScreen){
                    player1Score=0;
                    player2Score=0;   
                    showWinScreen=false;   
                }         
        }
        
		window.onload = function(){
			canvas = document.getElementById('pongCanvas');
            canvasContext = canvas.getContext('2d');
            
            var framesPerSecond = 30;
            setInterval(function(){
                moveEveryThing();
                drawEveryThing();
            },1000/framesPerSecond);
		    
            canvas.addEventListener('mousedown',handleWinScreen);
              
            canvas.addEventListener('mousemove',function(evt){
                var mousePos = calculateMousePos(evt);
                paddleLeftY = mousePos.y - (PADDLE_HEIGHT/2);
            });
              
        }
        
        function ballReset(){
            if(player1Score >=  WINNING_SCORE || player2Score >= WINNING_SCORE){
                showWinScreen = true;
            }
            ballSpeedX = -ballSpeedX;
            ballX = canvas.width/2;
            ballY = canvas.height/2;
        }
        
        function computerMovement(){
            var paddleRightCenter = paddleRightY + (PADDLE_HEIGHT/2);
            if(paddleRightCenter<(ballY-35)){
                paddleRightY += 8;
            }
            else if(paddleRightCenter>(ballY+35)){
                paddleRightY -= 8;                
            }
        }
        
        var moveEveryThing = function(){
            if(showWinScreen){
                return;
            }
            
            computerMovement();
            
            ballX = ballX + ballSpeedX;
            ballY = ballY + ballSpeedY;
            if(ballX<0){
                if(ballY>paddleLeftY && ballY < paddleLeftY+PADDLE_HEIGHT){
                    ballSpeedX = -ballSpeedX;  
                    var deltaY = ballY - (paddleLeftY+PADDLE_HEIGHT/2);
                    ballSpeedY = deltaY * 0.35;  
                }
                else{
                player2Score++;
                ballReset();
                }
            }
            if(ballX>canvas.width){
                if(ballY>paddleRightY && ballY < paddleRightY+PADDLE_HEIGHT){
                    ballSpeedX = -ballSpeedX;    
                    var delta = ballY - (paddleRightY+PADDLE_HEIGHT/2);
                    ballSpeedY = delta * 0.35;
                }
                else{
                player1Score++;
                ballReset();
                }
            }
             
            if(ballY<0){
                ballSpeedY = -ballSpeedY;
            }
            if(ballY>canvas.height){
                ballSpeedY = -ballSpeedY;
            }
        };
        
        function drawNet(){
            for(var i=0;i<canvas.height;i+=40){
                colorRect(canvas.width/2,i,2,20,'white');
            }
        }
        
        var drawEveryThing = function(){
           
            //console.log(ballX);
            // next line blanks out screen with black            
            colorRect(0,0,canvas.width,canvas.height,'black');
             if(showWinScreen){
                canvasContext.fillStyle = 'white';
                if(player1Score >=  WINNING_SCORE){
                   canvasContext.fillText('Left player won',350,200); 
                }
                else if(player2Score >= WINNING_SCORE){
                    canvasContext.fillText('Right player won',350,200);
                }
                canvasContext.fillText('click to cintinue',350,500);
                return;
            }
            
            drawNet();
            // next line is for red ball
            colorCircle(ballX,ballY,10,'pink');
            // next line is for left paddle
            colorRect(0,paddleLeftY,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');          
            // next line is for right paddle
            colorRect(canvas.width-PADDLE_THICKNESS,paddleRightY,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');      
            
            canvasContext.fillText(player1Score,100,100);
            canvasContext.fillText(player2Score,canvas.width-100,100);    
        };
        
        function colorCircle(centerX,centerY,radius,ballColor){
            canvasContext.fillStyle = ballColor;
            canvasContext.beginPath();
            canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
            canvasContext.fill();
        }
        
        function colorRect(leftX,topY,width,height,drawColor){
            canvasContext.fillStyle = drawColor;
            canvasContext.fillRect(leftX,topY,width,height);
        }
