// https://jsfiddle.net/p49HD/1/
// https://www.w3schools.com/html/html5_canvas.asp
// https://en.wikipedia.org/wiki/Barnsley_fern#Construction


let canvas, context, width, height, currentPoint;



const drawPoint = function(point) {
    s.fillRect(point.x+0.5, point.y+0.5, 2, 2);
};

const makePoint = function(x, y) {
    this.x = x;
    this.y = y;
};

const initializeCanvas = function() {
    canvas = document.getElementById("Serpinski");
    context = canvas.getContext("2d");
    currentPoint = makePoint(0, 0);
    width = window.innerWidth;
    height = window.innerHeight;
    // console.log(width, height);
    canvas.width = width;
    canvas.height = height;
};

initializeCanvas();