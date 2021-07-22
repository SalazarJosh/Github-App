$(".contentArea7").click(function() {
  setup();
});

var canvas = document.getElementById('generativeCanvas');
var context = canvas.getContext('2d');

var size = window.innerWidth;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = 300;
var height = 300;
context.scale(dpr, dpr);

context.lineWidth = 2;

context.globalAlpha = .5;

function interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) {
    factor = 0.5;
  }
  var result = color1.slice();
  for (var i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
};

function interpolateColors(color1, color2, steps) {
  var stepFactor = 1 / (steps - 1),
    interpolatedColorArray = [];

  color1 = color1.match(/\d+/g).map(Number);
  color2 = color2.match(/\d+/g).map(Number);

  for (var i = 0; i < steps; i++) {
    interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
  }

  return interpolatedColorArray;
}

var step;

var x = 0;
var y = 0;

var colorArrayIteration = 0;


var color1;
var color2;

var interpolatedColorArray;

var timeoutFunction;

var shape;

var fillStroke;

var finalSize = 3;
var startSteps;
var offset = 2;
var tileStep = (size - offset * 2) / 7;
var startSize = tileStep;
var directions = [-1, 0, 1];

function setup() {
  clearTimeout(timeoutFunction);
  context.clearRect(0, 0, size, canvas.height);

  shape = Math.floor(Math.random() * 5);;

  if (shape == 1) {
    fillStroke = Math.floor(Math.random() * 2);
  }

  step = 50;

  x = 0;
  y = 0;

  colorArrayIteration = 0;


  color1 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ", 200)";
  color2 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ", 200)";

  interpolatedColorArray = interpolateColors(color1, color2, size / step);
  myLoop();
}

function strokePath() {
  context.strokeStyle = `rgb(
  ${interpolatedColorArray[colorArrayIteration][0]},
  ${interpolatedColorArray[colorArrayIteration][1]},
  ${interpolatedColorArray[colorArrayIteration][2]})`;
  context.stroke();
}

function fillShape() {
  context.fillStyle = `rgb(
  ${interpolatedColorArray[colorArrayIteration][0]},
  ${interpolatedColorArray[colorArrayIteration][1]},
  ${interpolatedColorArray[colorArrayIteration][2]})`;
  context.fill();
}

function drawSquare(x, y, width, height, xMovement, yMovement, steps) {

}

function myLoop() {
  timeoutFunction = setTimeout(function() {
    if (x < size) {
      if (y < height) {
        context.moveTo(x, y);

        if (shape == 0) {
          context.beginPath();

          let angle = Math.floor(Math.random() * 4);

          if (angle == 0) {
            context.arc(x + step / 2, y + step / 2, step / 2, 0, 1.5 * Math.PI);
            strokePath();
          } else if (angle == 1) {
            context.arc(x + step / 2, y + step / 2, step / 2, .5 * Math.PI, 0);
            strokePath();
          } else if (angle == 2) {
            context.arc(x + step / 2, y + step / 2, step / 2, 1 * Math.PI, .5 * Math.PI);
            strokePath();
          } else {
            context.arc(x + step / 2, y + step / 2, step / 2, 1.5 * Math.PI, 1 * Math.PI);
            strokePath();
          }
        } else if (shape == 1) {
          let direction = Math.floor(Math.random() * 4);
          if (direction == 0) { //bottom Left
            context.beginPath();
            context.moveTo(x + step, y + step);
            context.lineTo(x, y + step);
            context.lineTo(x, y);
            fillShape();
          } else if (direction == 1) { // top left
            context.beginPath();
            context.moveTo(x + step, y);
            context.lineTo(x, y + step);
            context.lineTo(x, y);
            fillShape();
          } else if (direction == 2) { // top right
            context.beginPath();
            context.moveTo(x + step, y);
            context.lineTo(x + step, y + step);
            context.lineTo(x, y);
            fillShape();
          } else { //bottom right
            context.moveTo(x + step, y);
            context.beginPath();
            context.moveTo(x + step, y + step);
            context.lineTo(x, y + step);
            context.lineTo(x + step, y);
            fillShape();
          }
        } else if (shape == 2) {
          context.beginPath();
          context.rect(x, y, step, step);
          fillShape();

          let hasStep = Math.floor(Math.random() * 2);
          if (hasStep == 1) {
            context.beginPath();
            context.arc(x + step / 2, y + step / 2, Math.random() * (step / 2), 0, 2 * Math.PI);
            fillShape();
          }
        } else if (shape == 3) {
          context.beginPath();
          let setScale = Math.random() * (step * 2);
          context.rect(x, y, setScale, setScale);
          fillShape();
        } else {
          context.beginPath();
          let verticalOrHorizontal = Math.floor(Math.random() * 2);
          let locX, locY;
          if (verticalOrHorizontal == 0) {
            locX = Math.ceil(Math.floor(Math.random() * 5) / 10) * 10;
            if (locX != 50)
              context.rect(x + locX, y, step - locX, step);
            fillShape()
          } else {
            locY = Math.ceil(Math.floor(Math.random() * 5) / 10) * 10;
            if (locY != 50)
              context.rect(x, y + locY, step, step - locY)
            fillShape()
          }
        }

        y += step;
        myLoop();
        return;
      } else {
        y = 0;
        colorArrayIteration += 1;
        x += step;
      }
      myLoop();
    }
  }, 10)
}

setup();