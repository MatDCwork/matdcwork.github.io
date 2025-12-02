// Name: Matthew Cagulada | File: main.js | Date: November 30, 2025
// Part 4 — Shape parent class + Ball child + EvilCircle child with
// draw(), checkBounds(), collisionDetect(). The loop draws the EvilCircle each frame.

// --- constants (canvas; ctx; width; height)
const canvas = document.querySelector('canvas');
const ctx     = canvas.getContext('2d');
const width  = canvas.width  = Math.min(1100, window.innerWidth - 32);
const height = canvas.height = Math.min(680, window.innerHeight - 160);

// utility
function rand(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }
function randRGB(){ return `rgb(${rand(80,255)}, ${rand(80,255)}, ${rand(80,255)})`; }

// ---------- Shape (parent) ----------
class Shape {
  constructor(x, y, velX, velY){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// ---------- Ball (child of Shape) ----------
class Ball extends Shape {
  // replace first four args with super(); keep color & size here
  constructor(x, y, velX, velY, color, size){
    super(x, y, velX, velY);
    this.color = color;
    this.size  = size;
    this.exists = true;
  }

  draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update(){
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0)  this.velX = -this.velX;
    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) this.velY = -this.velY;
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(balls){
    for (const other of balls){
      if (this !== other && other.exists){
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dist = Math.hypot(dx, dy);
        if (dist < this.size + other.size){
          this.color  = randRGB();
          other.color = randRGB();
        }
      }
    }
  }
}

// ---------- EvilCircle (child of Shape) ----------
class EvilCircle extends Shape {
  constructor(x, y){
    super(x, y, 7, 7);               // speed stored in velX/velY
    this.size = 26;                  // ring radius
    this.color = '#79c0ff';
    // input state
    this.left = this.right = this.up = this.down = false;
    this.#initKeys();
  }

  #initKeys(){
    window.addEventListener('keydown', e=>{
      if (e.key === 'a' || e.key === 'A') this.left = true;
      if (e.key === 'd' || e.key === 'D') this.right = true;
      if (e.key === 'w' || e.key === 'W') this.up = true;
      if (e.key === 's' || e.key === 'S') this.down = true;
    });
    window.addEventListener('keyup', e=>{
      if (e.key === 'a' || e.key === 'A') this.left = false;
      if (e.key === 'd' || e.key === 'D') this.right = false;
      if (e.key === 'w' || e.key === 'W') this.up = false;
      if (e.key === 's' || e.key === 'S') this.down = false;
    });
  }

  draw(){
    // move based on keys each frame
    if (this.left)  this.x -= this.velX;
    if (this.right) this.x += this.velX;
    if (this.up)    this.y -= this.velY;
    if (this.down)  this.y += this.velY;

    // ring
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.stroke();
  }

  checkBounds(){
    // clamp within canvas
    if (this.x - this.size < 0) this.x = this.size;
    if (this.x + this.size > width) this.x = width - this.size;
    if (this.y - this.size < 0) this.y = this.size;
    if (this.y + this.size > height) this.y = height - this.size;
  }

  collisionDetect(balls){
    for (const b of balls){
      if (!b.exists) continue;
      const dx = this.x - b.x;
      const dy = this.y - b.y;
      const dist = Math.hypot(dx, dy);
      if (dist < this.size + b.size){
        b.exists = false;            // remove the ball
      }
    }
  }
}

// ---------- build balls & HUD ----------
const countEl = document.querySelector('#count');
const balls = [];
while (balls.length < 25){
  const size = rand(10, 22);
  balls.push(
    new Ball(
      rand(size, width - size),
      rand(size, height - size),
      (rand(-5, 5) || 1),
      (rand(-5, 5) || -1),
      randRGB(),
      size
    )
  );
}
countEl.textContent = balls.length;

// EvilCircle instance
const evil = new EvilCircle(width/2, height/2);

// ---------- loop ----------
function loop(){
  // trail background
  ctx.fillStyle = 'rgba(15,17,21,0.35)';
  ctx.fillRect(0,0,width,height);

  // balls
  for (const b of balls){
    if (!b.exists) continue;
    b.draw();
    b.update();
    b.collisionDetect(balls);
  }

  // count remaining
  const remaining = balls.filter(b=>b.exists).length;
  countEl.textContent = remaining;

  // evil circle each frame (draw + bounds + eat)
  evil.draw();
  evil.checkBounds();
  evil.collisionDetect(balls);

  requestAnimationFrame(loop);
}
loop();
