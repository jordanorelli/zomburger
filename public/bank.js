class Bank {
  constructor() {

  }

  draw(x, y, w, h) {
    tint(Colors.Eggplant);
    let purple = color(Colors.Eggplant);
    noFill();
    stroke(purple);
    strokeWeight(2);
    rect(x, y, w, h);
    image(Images.bank, x, y, w, h);
  }
}
