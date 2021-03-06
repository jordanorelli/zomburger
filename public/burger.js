class Burger {
  constructor(x, y) {
    this.image = Images.burger;
    this.position = {x: x, y: y};
    this.velocity = {x: 0, y: -400};
    this.width = 32;
    this.height = 32;
    this.hitbox = {
      width: this.width * 0.6,
      height: this.height * 0.6,
    };
    this.alive = true;
  }

  update() {
    let dt = deltaTime / 1000;
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
  }

  draw() {
    let half = {
      width: this.width * 0.5,
      height: this.height * 0.5,
    };
    let corner = {
      x: this.position.x - half.width,
      y: this.position.y - half.height,
    };
    tint(Colors.Purple);
    image(this.image, corner.x, corner.y, this.width, this.height);
    
    if (debug) {
      strokeWeight(4);
      stroke('#FF0000');
      point(this.position.x, this.position.y);
      strokeWeight(1);
      noFill();
      rect(this.position.x - this.hitbox.width * 0.5,
        this.position.y - this.hitbox.height * 0.5,
        this.hitbox.width,
        this.hitbox.height);
    }
  }

  kill() {
    this.alive = false;
  }

  isDead() {
    return !this.alive || this.outOfBounds();
  }
}

Burger.prototype.bounds = bounds;
Burger.prototype.outOfBounds = outOfBounds;
Burger.prototype.overlaps = overlaps;
