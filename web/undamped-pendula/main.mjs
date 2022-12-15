const p1 = () => {
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
  const iterationElement = document.querySelector("span#iterations-1");
  let iteration = 0;

  const incrementIteration = () => {
    iteration++;
    iterationElement.innerText = `${iteration}`;
  };

  /**
   * get canvas
   * @type {HTMLCanvasElement}
   */
  const canvas = document.querySelector("canvas#canvas-1");

  // set canvas width and height
  canvas.width = size;
  canvas.height = size;

  // get 2d context
  const ctx = canvas.getContext("2d");

  /**
   * pendulum state
   * @type {{length: number, origin: Point, angle: number, velocity: number, mass: number, gravity: number}}
   */
  const pendulum = {
    length: 0.35 * size,
    origin: [0.5 * size, 0.5 * size],
    angle: 0,
    velocity: 1,
    mass: 0,
    gravity: 1,
  };

  const step_size = 0.1;

  /**
   * Draws a dot on the canvas
   * @param {number} x
   * @param {number} y
   * @param {number} dotSize
   */
  const drawDot = (x, y, dotSize = 1) => {
    ctx.fillStyle = "white";
    // ctx.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);

    // circular dot
    ctx.beginPath();
    ctx.arc(x, y, dotSize / 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const deduceMassPosition = () => {
    const [x, y] = pendulum.origin;
    const { length, angle } = pendulum;
    return [x + length * Math.sin(angle), y + length * Math.cos(angle)];
  };

  const connectPoints = (point1, point2) => {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const render = () => {
    // clear canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);

    // draw origin
    drawDot(...pendulum.origin, 8);

    // draw mass
    const [massX, massY] = deduceMassPosition();
    drawDot(massX, massY, 64);

    // connect line
    connectPoints(pendulum.origin, [massX, massY]);

    // using the Euler midpoint method
    // updatePendulumMidpoint();

    // using the Euler method
    updatePendulumEuler();
  };

  const updatePendulumEuler = () => {
    const old_angle = pendulum.angle;
    pendulum.angle = pendulum.angle + step_size * pendulum.velocity;
    pendulum.velocity =
      pendulum.velocity +
      step_size * ((-pendulum.gravity / 1) * Math.sin(old_angle));
  };

  const updatePendulumMidpoint = () => {
    const angle_mid = pendulum.angle + 0.5 * step_size * pendulum.velocity;
    const velocity_mid =
      pendulum.velocity +
      0.5 * step_size * ((-pendulum.gravity / 1) * Math.sin(pendulum.angle));
    pendulum.angle = pendulum.angle + step_size * velocity_mid;
    pendulum.velocity =
      pendulum.velocity +
      step_size * ((-pendulum.gravity / 1) * Math.sin(angle_mid));
  };

  const main = () => {
    render();
    incrementIteration();
    requestAnimationFrame(main);
  };

  main();
};

const p2 = () => {
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
  const iterationElement = document.querySelector("span#iterations-2");
  let iteration = 0;

  const incrementIteration = () => {
    iteration++;
    iterationElement.innerText = `${iteration}`;
  };

  /**
   * get canvas
   * @type {HTMLCanvasElement}
   */
  const canvas = document.querySelector("canvas#canvas-2");

  // set canvas width and height
  canvas.width = size;
  canvas.height = size;

  // get 2d context
  const ctx = canvas.getContext("2d");

  /**
   * pendulum state
   * @type {{length: number, origin: Point, angle: number, velocity: number, mass: number, gravity: number}}
   */
  const pendulum = {
    length: 0.35 * size,
    origin: [0.5 * size, 0.5 * size],
    angle: 0,
    velocity: 1,
    mass: 0,
    gravity: 1,
  };

  const step_size = 0.1;

  /**
   * Draws a dot on the canvas
   * @param {number} x
   * @param {number} y
   * @param {number} dotSize
   */
  const drawDot = (x, y, dotSize = 1) => {
    ctx.fillStyle = "white";
    // ctx.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);

    // circular dot
    ctx.beginPath();
    ctx.arc(x, y, dotSize / 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const deduceMassPosition = () => {
    const [x, y] = pendulum.origin;
    const { length, angle } = pendulum;
    return [x + length * Math.sin(angle), y + length * Math.cos(angle)];
  };

  const connectPoints = (point1, point2) => {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const render = () => {
    // clear canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);

    // draw origin
    drawDot(...pendulum.origin, 8);

    // draw mass
    const [massX, massY] = deduceMassPosition();
    drawDot(massX, massY, 64);

    // connect line
    connectPoints(pendulum.origin, [massX, massY]);

    // using the Euler midpoint method
    updatePendulumMidpoint();

    // using the Euler method
    // updatePendulumEuler();
  };

  const updatePendulumEuler = () => {
    const old_angle = pendulum.angle;
    pendulum.angle = pendulum.angle + step_size * pendulum.velocity;
    pendulum.velocity =
      pendulum.velocity +
      step_size * ((-pendulum.gravity / 1) * Math.sin(old_angle));
  };

  const updatePendulumMidpoint = () => {
    const angle_mid = pendulum.angle + 0.5 * step_size * pendulum.velocity;
    const velocity_mid =
      pendulum.velocity +
      0.5 * step_size * ((-pendulum.gravity / 1) * Math.sin(pendulum.angle));
    pendulum.angle = pendulum.angle + step_size * velocity_mid;
    pendulum.velocity =
      pendulum.velocity +
      step_size * ((-pendulum.gravity / 1) * Math.sin(angle_mid));
  };

  const main = () => {
    render();
    incrementIteration();
    requestAnimationFrame(main);
  };

  main();
};

p1();
p2();
