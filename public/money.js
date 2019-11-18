class Money {
  constructor(x, y) {
    this.image = Images.cash;
    this.position = {x: x, y: y};
    this.velocity = {x: 0, y: 0};
    this.width = 32;
    this.height = 32;
    this.hitbox = {
      width: this.width * 0.6,
      height: this.height * 0.6,
    };
    this.alive = true;
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
    tint(Colors.DarkGreen);
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
}

Money.prototype.bounds = bounds;
Money.prototype.outOfBounds = outOfBounds;
Money.prototype.overlaps = overlaps;
