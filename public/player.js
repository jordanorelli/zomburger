class Player {
  constructor(options) {
    options = options || {};
    this.game = options.game;
    this.id = options.id;
    this.image = random(Images.players);
    this.width = options.width || 64;
    this.height = options.height || 64;
    this.hitbox = {
      width: this.width * 0.6,
      height: this.height * 0.6,
    };
    this.burgers = 5;
    this.maxBurgers = 12;
    this.moneys = 0;
    this.maxMoneys = 20;
    this.score = 0;
    this.position = {x: options.x, y: options.y};
    this.velocity = {x: 0, y: 0};
  }

  update() {
    let dt = deltaTime / 1000;
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
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
    tint(Colors.Purple);
    image(this.image, corner.x, corner.y, this.width, this.height);

    this.drawBurgerMeter();
    this.drawMoneyMeter();

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

  drawBurgerMeter() {
    let half = {width: this.width*0.5, height: this.height*0.5};
    let box = {
      w: 64,
      h: 12,
      x: this.position.x - half.width,
      y: this.position.y + half.height,
    }

    stroke(Colors.Purple);
    strokeWeight(1);
    noFill();
    rect(box.x, box.y, box.w, box.h, 4);

    let cellWidth = (box.w-8) / this.maxBurgers;

    noStroke();
    fill(Colors.Purple);
    for (let i = 0; i < this.burgers; i++) {
      let cellX = box.x + 4 + i * cellWidth;
      rect(cellX, box.y+2, cellWidth-1, 8);
    }
  }

  drawMoneyMeter() {
    let half = {width: this.width*0.5, height: this.height*0.5};
    let box = {
      w: 64,
      h: 12,
      x: this.position.x - half.width,
      y: this.position.y + half.height + 14,
    }

    stroke(Colors.DarkGreen);
    strokeWeight(1);
    noFill();
    rect(box.x, box.y, box.w, box.h, 4);

    let cellWidth = (box.w-8) / this.maxMoneys;

    noStroke();
    fill(Colors.DarkGreen);
    for (let i = 0; i < this.moneys; i++) {
      let cellX = box.x + 4 + i * cellWidth;
      rect(cellX, box.y+2, cellWidth-1, 8);
    }
  }

  kill() {
    // something here
  }

  joystickInput(x, y) {
    this.velocity.x = x * 200;
    this.velocity.y = y * -200;
  }

  buyBurger() {
    if (this.moneys > 0 && (this.burgers+2) <= this.maxBurgers) {
      this.moneys--;
      this.burgers+=2;
    }
  }

  makeDeposit() {
    if (this.moneys > 0) {
      this.moneys--;
      this.score++;
    }
  }

  throwBurger() {
    if (this.burgers > 0) {
      this.burgers--;
      this.game.addBurger(this.id);
    } else {

    }
  }
}

Player.prototype.bounds = bounds;
Player.prototype.outOfBounds = outOfBounds;
Player.prototype.overlaps = overlaps;
