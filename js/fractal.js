// https://jsfiddle.net/p49HD/1/
// https://www.w3schools.com/html/html5_canvas.asp
// https://en.wikipedia.org/wiki/Barnsley_fern#Construction

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };
};

let canvas, context, width, height, currentPoint;

const jumpToNewPoint = function(point0, point1, ratio) { // will go too far for ratio < 1
    return new Point(point0.x + ((point1.x - point0.x)/ratio), point0.y + ((point1.y - point0.y)/ratio)); // new point a distance of 1/ratio from point0 to point1
};

/*--------Sierpinski's Triangle----------*/

let vertices = [];

const initializeSierpinskiCanvas = function() {
    canvas = document.getElementById('Sierpinski'); // cached element reference
    context = canvas.getContext('2d');
    canvas.width = width = window.innerWidth; // use the full window
    canvas.height = height = window.innerHeight;
    context.fillStyle = 'white'; // white dots
    // three reference points for Sierpinski's Triangle
    vertices = [];
    vertices.push(new Point(0, 0));
    vertices.push(new Point(width/2, height));
    vertices.push(new Point(width, 0));
    // start somewhere random on the page
    currentPoint = new Point(Math.random() * width, Math.random() * height);
    // repeatedly create new points
    setInterval(placeSierpinskiDot, 0);
};

const placeSierpinskiDot = function() {
    let destination = vertices[Math.floor(Math.random() * vertices.length)]; // choose a random destination point from the available vertices
    currentPoint = jumpToNewPoint(currentPoint, destination, 2); // ratio = 2
    context.fillRect(currentPoint.x, currentPoint.y, 1, 1); // display new point
};

// initialize
initializeSierpinskiCanvas();

/*----cached element references and event listeners to switch the fractal display----*/

const clickSierpinski = document.getElementById('clickSierpinski');
const showSierpinski = document.getElementById('Sierpinski');


const handleSierpinski = function(e) {
    // showSierpinski.style.display = showSierpinski.style.display === 'none' ? '' : 'none';
    showSierpinski.style.display = '';
    // restart fractal
    initializeSierpinskiCanvas();
};

clickSierpinski.addEventListener('click', handleSierpinski);


// TODO
// use just the one canvas instead of show/hide
// find more chaos game fractals https://en.wikipedia.org/wiki/Chaos_game
// generalize functions - 
//      
// 