// https://jsfiddle.net/p49HD/1/
// https://www.w3schools.com/html/html5_canvas.asp
// https://en.wikipedia.org/wiki/Barnsley_fern#Construction

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };
    scaleX = function(scalar) {
        return this.x * scalar;
    };
    scaleY = function(scalar) {
        return this.y * scalar;
    };
    bumpX = function(dist) {
        return this.x + dist;
    };
    bumpY = function(dist) {

        return this.y + dist;
    };
};

let canvas, context, width, height, currentPoint, currentFractal;

const jumpToNewPoint = function(point0, point1, ratio) { // will go too far for ratio < 1
    return new Point(point0.x + ((point1.x - point0.x)/ratio), point0.y + ((point1.y - point0.y)/ratio)); // new point a distance of 1/ratio from point0 to point1
};

const resetCanvas = function() {
    clearInterval(currentFractal);
    canvas = document.getElementById('fractal');
    context = canvas.getContext('2d');
    canvas.width = width = window.innerWidth; // use the full window
    canvas.height = height = window.innerHeight;
    context.fillStyle = 'white'; // white dots
};

/*--------Sierpinski's Triangle----------*/

let vertices = [];

const initializeSierpinski = function() {
    resetCanvas();
    // three reference points for Sierpinski's Triangle
    vertices = [];
    vertices.push(new Point(0, 0));
    vertices.push(new Point(width/2, height));
    vertices.push(new Point(width, 0));
    // start somewhere random on the page
    currentPoint = new Point(Math.random() * width, Math.random() * height);
    // repeatedly create new points
    currentFractal = setInterval(placeSierpinskiDot, 0);
};

const placeSierpinskiDot = function() {
    let destination = vertices[Math.floor(Math.random() * vertices.length)]; // choose a random destination point from the available vertices
    currentPoint = jumpToNewPoint(currentPoint, destination, 2); // ratio = 2
    context.fillRect(currentPoint.x, currentPoint.y, 1, 1); // display new point
};

// initialize
initializeSierpinski();

/*--------Vicsek Fractal, saltire form----------*/

const initializeVicsek = function() {
    resetCanvas();
    // reference points: 4 corners and center of square
    vertices = [];
    vertices.push(new Point(0, 0));
    vertices.push(new Point(width, 0));
    vertices.push(new Point(width, height));
    vertices.push(new Point(0, height));
    vertices.push(new Point(width/2, height/2));
    // start somewhere random on the page
    currentPoint = new Point(Math.random() * width, Math.random() * height);
    // repeatedly create new points
    currentFractal = setInterval(placeVicsekDot, 0);
};

const placeVicsekDot = function() {
    let destination = vertices[Math.floor(Math.random() * vertices.length)]; // choose a random destination point from the available vertices
    currentPoint = jumpToNewPoint(currentPoint, destination, 3/2); // 2/3rds of the distance
    context.fillRect(currentPoint.x, currentPoint.y, 1, 1); // display new point
};

/*--------Barnsley's Fern----------*/

const initializeBarnsley = function() {
    resetCanvas();
    currentPoint = new Point(0, 0);
    currentFractal = setInterval(placeBarnsleyDot, 0);
};

const placeBarnsleyDot = function() {
    // choose random affine transformation
    currentPoint = barnsleyTransform[Math.floor(Math.random() * 100)](currentPoint);
    console.log(currentPoint);
    let offset = width/2;
    let scaleFactor = 92;
    context.fillRect(currentPoint.scaleX(scaleFactor) + offset, currentPoint.scaleY(scaleFactor), 1, 1); // display new point
};

const affineTransform = function(p, a, b, c, d, e, f) { // point p
    	/*  matrix multiplication
		[a, b] X [point.x] + [e]
		[c, d]   [point.y]   [f]
		*/
    return new Point(a * p.x + b * p.y + e, c * p.x + d * p.y + f);
};

const f1 = (point) => {
    return affineTransform(point, 0, 0, 0, 0.16, 0, 0);
};

const f2 = (point) => {
    return affineTransform(point, 0.85, 0.04, -0.04, 0.85, 0, 1.6);
};

const f3 = (point) => {
    return affineTransform(point, 0.2, -0.26, 0.23, 0.22, 0, 1.6);
};

const f4 = (point) => {
    return affineTransform(point, -0.15, 0.28, 0.26, 0.24, 0, 0.44);
};

const barnsleyTransform = [
    Array(1).fill(f1),
    Array(85).fill(f2),
    Array(7).fill(f3),
    Array(7).fill(f4)
].flat();

/*----cached element references and event listeners to switch the fractal display----*/

const clickSierpinski = document.getElementById('clickSierpinski');
const clickVicsek = document.getElementById('clickVicsek');
const clickBarnsley = document.getElementById('clickBarnsley');

const handleSierpinski = function(e) {
    initializeSierpinski();
};

const handleVicsek = function(e) {
    initializeVicsek();
};

const handleBarnsley = function(e) {
    initializeBarnsley();
};

clickSierpinski.addEventListener('click', handleSierpinski);
clickVicsek.addEventListener('click', handleVicsek);
clickBarnsley.addEventListener('click', handleBarnsley);

// TODO
// use just the one canvas instead of show/hide
// find more chaos game fractals https://en.wikipedia.org/wiki/Chaos_game
// generalize functions - 
//      
// 