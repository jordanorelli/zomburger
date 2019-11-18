class Player {
  constructor(options) {
    options = options || {};
    this.game = options.game;
    this.id = options.id;
    this.image = random(Images.players);
    this.width = options.width || 64;
    this.height = options.height || 64;
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
    let corner = {
      x: this.position.x - this.width*0.5,
      y: this.position.y - this.height*0.5
    };
    let half = {
      width: this.width * 0.5,
      height: this.height * 0.5,
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
      rect(corner.x, corner.y, this.width, this.height);
    }
  }

  drawBurgerMeter() {
    let half = {width: this.width*0.5, height: this.height*0.5};
    let w = this.width;
    let h = this.height * 0.2;
    let x = this.position.x - half.width;
    let y = this.position.y + half.height + this.height * 0.1;
    let cellWidth = w / this.maxBurgers;

    stroke(Colors.Purple);
    strokeWeight(1);
    noFill();
    rect(x, y, w, h, 4);

    noStroke();
    fill(Colors.Purple);
    for (let i = 0; i < this.burgers; i++) {
      let cellX = x + i * cellWidth;
      rect(cellX + cellWidth * 0.1, y + h*0.1, cellWidth*0.8, h*0.8);
    }
  }

  drawMoneyMeter() {
    noStroke();
    fill(Colors.DarkGreen);
    let meterWidth = this.width;
    let meterHeight = this.height * 0.2;
    let cellWidth = meterWidth / this.maxMoneys;
    for (let i = 0; i < this.moneys; i++) {
      let x = this.position.x - this.width * 0.5 + i * cellWidth;
      let y = this.position.y + this.height * 0.5 + 30;
      rect(x + cellWidth * 0.1, y, cellWidth*0.8, 10);
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
