class Player {
  constructor(options) {
    options = options || {};
    this.game = options.game;
    this.id = options.id;
    this.image = random(Images.players);
    this.width = options.width || 64;
    this.height = options.height || 64;
    this.burgers = 5;
    this.position = {x: options.x, y: options.y};
    this.velocity = {x: 0, y: 0};
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

  joystickInput(x, y) {
    this.velocity.x = x * 200;
    this.velocity.y = y * -200;
  }

  buttonInput(val) {
    console.log(["player sees button input val", val]);
    if (val) {
      if (this.burgers > 0) {
        this.burgers--;
        this.game.addBurger(this.id);
      } else {

      }
    }
  }
}

Player.prototype.bounds = bounds;
Player.prototype.outOfBounds = outOfBounds;
Player.prototype.overlaps = overlaps;
