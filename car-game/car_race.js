window.onload = function(){
    carRace = document.getElementById('carraceCanvas');
    carRaceContext = carRace.getContext('2d');
    drawCanvas();
}

function drawCanvas(){
    carRaceContext.fillStyle = 'black';
    carRaceContext.fillRect(400,0,carRace.width,carRace.height);
}