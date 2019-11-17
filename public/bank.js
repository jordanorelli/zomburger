class Bank {
  constructor() {

  }

  draw(x, y, w, h) {
    tint(Colors.Purple);
    let purple = color(Colors.Purple);
    noFill();
    stroke(purple);
    strokeWeight(2);
    rect(x, y, w, h);
    image(Images.bank, x, y, w, h);
  }
}
