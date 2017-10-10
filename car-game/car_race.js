var carRaceTrack = document.getElementById('carraceCanvas');
var carRaceTrackContext = carRaceTrack.getContext('2d');
var boundryWidth = 10;
var boundryHeight = 80;
var boundryTopOffSet = 5;
var boundryLeftOffSet = 402;
var boundryPadding = 8;

setInterval(draw, 1000);

var boundry = [];

for (x = 0; x < 9; x++) {
    boundry[x] = { leftOffSet: 0, topOffSet: 0, width: 0, height: 0 };
}
var x = 5;
function draw() {
    drawCanvas(400, 0, carRaceTrack.width, carRaceTrack.height, 'black');
    //console.log('hello inside draw method');
    x++;
    var y = x + boundryHeight + boundryPadding;
    if (y > carRaceTrack.height) {
        y = boundryTopOffSet;
    } 
    if (x > carRaceTrack.height) {
        x = boundryTopOffSet;
    }

    //drawBoundryandCanvas(boundryLeftOffSet, x, boundryWidth, boundryHeight, 'white');
    //drawBoundryandCanvas(boundryLeftOffSet, y, boundryWidth, boundryHeight, 'white');
    for (i = 0; i < boundry.length; i++) {
        boundry[i].leftOffSet = boundryLeftOffSet;
        boundry[i].width = boundryWidth;
        boundry[i].height = boundryHeight;
        if (i == 0) {
            boundry[i].topOffSet = x;
        }
        else {
            boundry[i].topOffSet = y;
        }
        console.log(boundry[i].topOffSet);
        drawBoundry(boundry[i], 'white');
    }

}

function drawBoundry(x, elementColor) {
    carRaceTrackContext.fillStyle = elementColor;
    carRaceTrackContext.fillRect(x.leftOffSet, x.topOffSet, x.width, x.height);
}


function drawCanvas(posX, posY, width, height, elementColor) {
    carRaceTrackContext.fillStyle = elementColor;
    carRaceTrackContext.fillRect(posX, posY, width, height);
}