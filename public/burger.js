class Burger {
  constructor(x, y) {
    this.sprite = createSprite(x, y, 32, 32);
    this.sprite.velocity.y = -5;
    this.image = Images.burger;
  }

  update() {
    // this.sprite.velocity.x = this.joyX * 10;
    // this.sprite.velocity.y = this.joyY * -10;
  }

  draw() {
    tint(Colors.Purple);
    image(this.image, this.sprite.position.x-16, this.sprite.position.y-16, 32, 32);
    strokeWeight(4);
    stroke('#FF0000');
    point(this.sprite.position.x, this.sprite.position.y);
  }
}
