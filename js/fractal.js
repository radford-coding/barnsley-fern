// https://jsfiddle.net/p49HD/1/
// https://www.w3schools.com/html/html5_canvas.asp
// https://en.wikipedia.org/wiki/Barnsley_fern#Construction


let canvas, context, width, height, currentPoint, pointA, pointB, pointC;


// ! wow. need to set canvas' width and height inline, as that overrides the specificity of the default width/height values.
const initializeCanvas = function() {
    canvas = document.getElementById('Serpinski');
    context = canvas.getContext('2d');
    context.fillStyle = 'white';
    // context.fillRect(0, 0, 50, 50);
    width = canvas.width;
    height = canvas.height;
};

const randomDot = function() {
    let x = Math.random() * width;
    let y = Math.random() * height;
    context.fillRect(x, y, 2, 2);
};

initializeCanvas();

setInterval(randomDot, 30);



// const drawPoint = function(point) {
//     context.fillRect(point.x+0.5, point.y+0.5, 2, 2);
// };

// const Point = function(x, y) {
//     this.x = x;
//     this.y = y;
// };

// const initializeCanvas = function() {
//     canvas = document.getElementById('Serpinski');
//     context = canvas.getContext('2d');
//     context.fillStyle = '#FFFFFF';
//     currentPoint = new Point(0.5, 0.5); // eventually start somewhere random
//     pointA = new Point(0, 0);
//     pointB = new Point(100*Math.sin(Math.PI/6), 100*Math.cos(Math.PI/6));
//     pointC = new Point(100, 0);
//     width = window.innerWidth;
//     height = window.innerHeight;
//     console.log(width, height);
//     canvas.width = width;
//     canvas.height = height;
//     [currentPoint, pointA, pointB, pointC].forEach(p => drawPoint(p));
// };

// const serpinskiTransformation = function(start, destination) {
//     return new Point((start.x + destination.x)/2, (start.y + destination.y)/2);
// };

// const chooseRandomDestination = function() {
//     return [pointA, pointB, pointC][Math.floor(Math.random() * 3)];
// };

// const convertMath2Canvas = function(point) {
//     return new Point(80*point.x + width/2, (-50*point.y+height/2)+250);
// };

// const step = function() {
//     currentPoint = serpinskiTransformation(currentPoint, chooseRandomDestination);
//     drawPoint(convertMath2Canvas(currentPoint));
// };

// initializeCanvas();

// setInterval(step, 0);