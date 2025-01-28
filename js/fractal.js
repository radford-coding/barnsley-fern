// https://jsfiddle.net/p49HD/1/
// https://www.w3schools.com/html/html5_canvas.asp
// https://en.wikipedia.org/wiki/Barnsley_fern#Construction


let canvas, context, width, height, currentPoint;

/*--------Sierpinski's Triangle----------*/

let pointA, pointB, pointC;

const initializeSierpinskiCanvas = function() {
    canvas = document.getElementById('Sierpinski'); // cached element reference
    context = canvas.getContext('2d');
    canvas.width = width = window.innerWidth; // use the full window
    canvas.height = height = window.innerHeight;
    context.fillStyle = 'white'; // white dots
    // three reference points for Sierpinski's Triangle
    pointA = new Point(0, 0);
    pointB = new Point(width/2, height);
    pointC = new Point(width, 0);
    // start somewhere random on the page
    currentPoint = new Point(Math.random() * width, Math.random() * height);
};

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };
};

const placeDot = function() {
    // choose a random destination point
    let r = Math.random();
    let destination;
    if (r < 1/3) {
        destination = pointA;
    } else if (r < 2/3) {
        destination = pointB;
    } else {
        destination = pointC;
    };
    // make a new point halfway to it
    currentPoint = new Point(currentPoint.x + ((destination.x - currentPoint.x)/2), currentPoint.y + ((destination.y - currentPoint.y)/2));
    // display new point
    context.fillRect(currentPoint.x, currentPoint.y, 1, 1);
};
// initialize
initializeSierpinskiCanvas();
// repeatedly create new points
setInterval(placeDot, 0);




/*----cached element references and event listeners to switch the fractal display----*/

const clickSierpinski = document.getElementById('clickSierpinski');
const showSierpinski = document.getElementById('Sierpinski');


const handleSierpinski = function(e) {
    showSierpinski.style.display = showSierpinski.style.display === 'none' ? '' : 'none';
    // restart fractal
    initializeSierpinskiCanvas();
    setInterval(placeDot, 0);
};

clickSierpinski.addEventListener('click', handleSierpinski);