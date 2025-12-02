// Name: Matthew Cagulada | File: main.js | Date: November 30, 2025
// Part 3 requirements: constants, Ball class (x, y, velX, velY, color, size),
// draw(), update(), collisionDetect(); create 25 balls; loop() animates; call collisionDetect() in loop.

// --- constants (canvas; ctx; width; height)
const canvas = document.querySelector('canvas');
const ctx     = canvas.getContext('2d');
const width  = canvas.width  = Math.min(1100, window.innerWidth - 32);
const height = canvas.height = Math.min(680, window.innerHeight - 140);

// utility
function random(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomRGB(){
  return `rgb(${random(80,255)}, ${random(80,255)}, ${random(80,255)})`;
}

// --- Ball class (constructor takes 5 args per rubric: x, y, velX, velY, color, size)
class Ball {
  constructor(x, y, velX, velY, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.exists = true; // handy for Part 4 later
  }

  // draw() — draw the ball
  draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // update() — move and bounce off edges
  update(){
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -this.velX;
    }
    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  // collisionDetect() — simple color swap on collision
  collisionDetect(balls){
    for (const other of balls){
      if (this !== other && other.exists){
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dist = Math.hypot(dx, dy);
        if (dist < this.size + other.size){
          this.color  = randomRGB();
          other.color = randomRGB();
        }
      }
    }
  }
}

// --- while() loop that creates 25 random balls
const balls = [];
while (balls.length < 25){
  const size = random(10, 22);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-5, 5) || 1,                 // avoid 0 velocity
    random(-5, 5) || -1,
    randomRGB(),
    size
  );
  balls.push(ball);
}

// --- loop() function — animation frame; includes collisionDetect() call (rubric)
function loop(){
  // slight trail effect
  ctx.fillStyle = 'rgba(15, 17, 21, 0.35)';
  ctx.fillRect(0, 0, width, height);

  for (const b of balls){
    b.draw();
    b.update();
    b.collisionDetect(balls);
  }
  requestAnimationFrame(loop);
}
loop();
