var item_speed = 1;
var rect_color = null;
let test = 0;

class Rect{
  constructor(x, y, w, h, a){
    if (test == 0) {
      this.t = 1;
      test = 1;
    }
    else {
      this.t = 0;
    }

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.a = a;
    let theta = random(TAU);
    this.dx = cos(theta)*random(item_speed);
    this.dy = sin(theta)*random(item_speed);
    this.hue = random();
    this.n = floor(random(5, 10));
    this.type = floor(random(0, 3));
  }
  update(buffer){
    if (this.t == 1) {
      console.log('ITEM SPEEEED in rect : '+item_speed + " - dx : "+this.dx);
    }
    if (this.speed != item_speed) {
      this.speed = item_speed;
      this.dx = this.dx*this.speed;
    }
    let theta = random(TAU);

    this.x += this.dx * item_speed;

    this.y += this.dy * item_speed;

    if (this.x < 0 || this.x > buffer.width ) this.dx *= -1;
    if (this.y < 0 || this.y > buffer.height) this.dy *= -1;
  }
  render(buffer){
    buffer.push();
    buffer.translate(this.x, this.y);
    buffer.rotate(this.a);
    buffer.stroke(this.hue, 1, 1);
    buffer.fill(0);
    if (this.type == 0){
      for (let i = 0; i < this.n; i++){
        let amt = i/this.n;
        buffer.line(amt*this.w, 0, amt*this.w, this.h);
      }
    }
    if (this.type == 1){
      buffer.ellipse(0, 0, this.w);
    }
    if (this.type == 2){
      buffer.noFill();
      buffer.triangle(0, -this.h/2, this.w/2, this.h/2, -this.w/2, this.h/2);
    }
    buffer.pop();
  }
}

function setup (){
  pixelDensity(1);
  //let fractales = window.open();
  createCanvas();
  colorMode(HSB, 1, 1, 1);
  windowResized();
}

let rects = [];
let buffer, divs;
let init = () => {
  let s = (width*height)/(814*814);
  rects = [];
  for (let i = 0; i < 200; i++){
    rects.push(new Rect(
      random(width),
      random(height),
      random(40*s, 100*s),
      random(40*s, 100*s),
      random(TAU)
    ))
  }

  divs = floor(random(4, 12))*2;
  let w = Math.hypot(width, height)/2;
  let a = TAU/divs;
  let h = w*tan(a);
  buffer = createGraphics(w, h);
  buffer.colorMode(HSB, 1, 1, 1);
}

function draw(){
  background(0, .1);
  buffer.clear();
  rects.forEach(r => {
    r.update(buffer);
    r.render(buffer);
  });
  // buffer.background(1);
  buffer.fill(0);
  buffer.noStroke();
  buffer.triangle(0, 0, 0, buffer.height, buffer.width, buffer.height);
  push();
  translate(width/2, height/2);
  blendMode(ADD);
  for (let i = 0; i < divs; i++){
    push();
    let n = i;
    if ((divs/2)%2 == 0) n += i%2;
    rotate(n*TAU/divs);
    if (i%2 == 1) scale(-1, 1);
    image(buffer, 0, 0);
    pop();
  }
  pop();
}

function reload(){
  init();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  init();
}
