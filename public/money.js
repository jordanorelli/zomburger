class Money {
  constructor(x, y) {
    this.image = Images.cash;
    this.position = {x: x, y: y};
    this.velocity = {x: 0, y: 0};
    this.width = 32;
    this.height = 32;
    this.alive = true;
  }

  draw() {
    let half = {
      height: this.height * 0.5,
      width: this.width * 0.5,
    };
    tint(Colors.DarkGreen);
    image(this.image, this.position.x - half.width, this.position.y - half.height, this.width, this.height);
    
    if (debug) {
      strokeWeight(4);
      stroke('#FF0000');
      point(this.position.x, this.position.y);
      strokeWeight(1);
      noFill();
      rect(this.position.x - half.width, this.position.y - half.height, this.width, this.height);
    }
  }
}

Money.prototype.bounds = bounds;
Money.prototype.outOfBounds = outOfBounds;
Money.prototype.overlaps = overlaps;
