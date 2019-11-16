// Frame represents an embroidery frame
class Frame {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
  }

  draw() {
    stroke(Colors.DarkTan);
    strokeWeight(4);
    fill(Colors.Tan);
    rectMode(CORNERS);
    rect(this.x, this.y, this.width, this.height);
  }


}
