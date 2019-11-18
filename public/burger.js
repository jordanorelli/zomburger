class Burger {
  constructor(x, y) {
    this.image = Images.burger;
    this.position = {x: x, y: y};
    this.velocity = {x: 0, y: -400};
    this.width = 32;
    this.height = 32;
    this.alive = true;
  }

  update() {
    let dt = deltaTime / 1000;
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
  }

  draw() {
    let corner = {
      x: this.position.x - this.width*0.5,
      y: this.position.y - this.height*0.5
    };

    tint(Colors.Purple);
    image(this.image, corner.x, corner.y, this.width, this.height);

    if (debug) {
      strokeWeight(4);
      stroke('#FF0000');
      point(this.position.x, this.position.y);

      strokeWeight(1);
      noFill();
      rect(corner.x, corner.y, this.width, this.height);
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
