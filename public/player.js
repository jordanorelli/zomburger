class Player {
  constructor(options) {
    options = options || {};
    this.id = "p"+options.id;
    this.image = random(Images.players);
    this.width = options.width;
    this.height = options.height;

    let sprite = createSprite(options.x, options.y, options.width, options.height);
    sprite.addImage(this.image);
    sprite.setCollider("rectangle", 0, 0, options.width, options.height);
    sprite.scale = 1;
    sprite.mass = 1;
    this.sprite = sprite;
    this.joyX = 0;
    this.joyY = 0;
  }

  update() {
    this.sprite.velocity.x = this.joyX * 10;
    this.sprite.velocity.y = this.joyY * -10;
  }

  draw() {
    tint(Colors.Purple);
    image(this.image, this.sprite.position.x, this.sprite.position.y, 64, 64);
  }

  joystickInput(x, y) {
    this.joyX = x;
    this.joyY = y;
  }
}
