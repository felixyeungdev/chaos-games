/**
 * @typedef {[number, number]} Point
 */

const height = window.innerHeight;
const width = window.innerWidth;
const size = Math.min(width, height);

/**
 * get iteration element
 * @type {HTMLSpanElement}
 */
const iterationElement = document.querySelector("span#iterations");
let iteration = 0;

const incrementIteration = () => {
  iteration++;
  iterationElement.innerText = `${iteration}`;
};

/**
 * get canvas
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector("canvas#canvas");

// set canvas width and height
canvas.width = size;
canvas.height = size;

// get 2d context
const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, size, size);

const length = size * 0.75;
const offset = 64;

/**
 * Draws a dot on the canvas
 * @param {number} x
 * @param {number} y
 * @param {number} dotSize
 */
const drawDot = (x, y, dotSize = 1) => {
  ctx.fillStyle = "white";
  ctx.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
};

/**
 * points representing the triangle
 * @type {[Point, Point, Point]}
 */
const triangle = [
  [size / 2, offset],
  [size / 2 - Math.tan(Math.PI / 6) * length, offset + length],
  [size / 2 + Math.tan(Math.PI / 6) * length, offset + length],
];

/**
 * Draws the triangle
 */
const drawTriangle = () => {
  triangle.forEach(([x, y]) => drawDot(x, y, 2));
};

/**
 * get a random vertex of the triangle
 * @returns {Point}
 */
const randomPointOfTriangle = () => {
  const randomPoint = Math.floor(Math.random() * 3);
  return triangle[randomPoint];
};

/**
 * Randomly generates a point in the triangle
 * @returns {Point}
 */
const randomPointInTriangle = () => {
  const [x1, y1] = triangle[0];
  const [x2, y2] = triangle[1];
  const [x3, y3] = triangle[2];

  const s = Math.random();
  const t = Math.random();

  if (s + t > 1) return randomPointInTriangle();

  const x = x1 + (x2 - x1) * s + (x3 - x1) * t;
  const y = y1 + (y2 - y1) * s + (y3 - y1) * t;

  return [x, y];
};

/**
 * Calculates the mid point of two points
 * @param {Point} point1
 * @param {Point} point2
 * @returns {Point}
 */
const midPoint = (point1, point2) => {
  const [x1, y1] = point1;
  const [x2, y2] = point2;

  return [(x1 + x2) / 2, (y1 + y2) / 2];
};

/**
 * Draws the Sierpinski triangle
 */
const drawSierpinski = async () => {
  drawTriangle();
  // take random point in triangle
  let currentPoint = randomPointInTriangle();
  drawDot(...currentPoint);

  const draw = async () => {
    // take random vertex of triangle
    const randomVertex = randomPointOfTriangle();
    // take mid point of current point and random vertex
    currentPoint = midPoint(currentPoint, randomVertex);
    drawDot(...currentPoint);
    incrementIteration();
    window.requestAnimationFrame(draw);
  };

  window.requestAnimationFrame(draw);
};

drawSierpinski();
