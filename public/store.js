class Store {
  constructor(options) {
    options = options || {};
    this.position = {
      x: options.x,
      y: options.y
    };
    this.width = options.width;
    this.height = options.height;
  }

  draw() {
    let corner = {
      x: this.position.x - this.width*0.5,
      y: this.position.y - this.height*0.5
    };
    let half = {
      width: this.width * 0.5,
      height: this.height * 0.5,
    };
    tint(Colors.Eggplant);
    let purple = color(Colors.Eggplant);
    noFill();

    stroke(purple);
    strokeWeight(2);
    rect(corner.x, corner.y, this.width, this.height);
    image(Images.restaurant, corner.x, corner.y, this.width, this.height);

    if (debug) {
      strokeWeight(4);
      stroke('#FF0000');
      point(this.position.x, this.position.y);
      strokeWeight(1);
      noFill();
      rect(corner.x, corner.y, this.width, this.height);
    }
  }
}

Store.prototype.bounds = bounds;
Store.prototype.outOfBounds = outOfBounds;
Store.prototype.overlaps = overlaps;
