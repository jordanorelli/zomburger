class Game {
  constructor (w, h) {
    this.w = w;
    this.h = h;
    this.players = {};
    this.numPlayers	= 0;
    this.id = 0;
    this.spawner = new ZombieSpawner({
      game: this,
      minX: 0,
      maxX: w,
      minY: 0,
      maxY: 0,
    });
    this.zombies = [];
    this.burgers = [];
    this.moneys = [];
    this.store = new Store({
      x: width * 0.25,
      y: height - 128,
      width: 128,
      height: 128,
    });
    this.bank = new Bank({
      x: width * 0.75,
      y: height - 128,
      width: 128,
      height: 128,
    });
  }

  add (id, x, y, w, h) {
    let player = new Player({
      game: this,
      id: id,
      x: x,
      y: y,
      width: w,
      height: h,
    })
    this.players[id] = player;
    print(player.id + " added.");
    this.id++;
    this.numPlayers++;
  }

  update() {
    this.burgers.forEach(b => b.update());
    this.zombies.forEach(z => z.update());

    for (let id in this.players) {
      let player = this.players[id];
      player.update();

      for (let zombie of this.zombies) {
        if (player.overlaps(zombie)) {
          zombie.kill();
          player.kill();
        }
      }

      for (let money of this.moneys) {
        if (player.moneys < player.maxMoneys && player.overlaps(money)) {
          money.kill();
          player.moneys++;
          console.log(["player picked up money", player]);
        }
      }
    }

    for (let burger of this.burgers) {
      for (let zombie of this.zombies) {
        if (burger.overlaps(zombie)) {
          burger.kill();
          let money = new Money(zombie.position.x, zombie.position.y);
          this.moneys.push(money);
          console.log(["adding money", money]);
          zombie.kill();
          break;
        }
      }
    }

    this.zombies = this.zombies.filter(z => !z.isDead());
    this.burgers = this.burgers.filter(b => !b.isDead());
    this.moneys = this.moneys.filter(m => m.alive);
  }

  draw() {
    this.update();
    this.bank.draw(width*0.25 - 64, height - 128 - 32, 128, 128);
    this.store.draw(width*0.75 - 64, height - 128 - 32, 128, 128);
    for (let id in this.players) {
      let player = this.players[id];
      player.draw();
    }
    this.zombies.forEach(z => z.draw());
    this.burgers.forEach(b => b.draw());
    this.moneys.forEach(m => m.draw());
    this.drawScores();
  }

  drawScores() {
    if (this.numPlayers == 0) {
      return;
    }

    let x = 32;
    let y = 90;
    let rowHeight = 32;
    let rowWidth = 128;

    let row = 0;
    for (let id in this.players) {
      let player = this.players[id];
      tint(Colors.Purple);
      image(player.image, x, y + row * rowHeight, 32, 32);

      textSize(24);
      fill(Colors.Purple);
      noStroke();
      textAlign(LEFT, CENTER);
      text(player.score, x + 32 + 10, y + rowHeight*0.5);
      row++;
    }

    noFill();
    stroke(Colors.Purple);
    strokeWeight(2);
    rect(x, y, rowWidth, rowHeight * row, 4, 4, 4, 4);
  }

  remove (id) {
      delete this.players[id];
      this.numPlayers--;
  }

  checkId (id) {
      if (id in this.players) { return true; }
      else { return false; }
  }

  buttonInput(id, val) {
    console.log(["game sees button input", [id, val]]);
    let player = this.players[id];
    if (player && val) {
      if (player.overlaps(this.store)) {
        player.buyBurger();
      } else if (player.overlaps(this.bank)) {
        player.makeDeposit();
      } else {
        player.throwBurger();
      }
    }
  }

  joystickInput(id, x, y) {
    let player = this.players[id];
    if (player) {
      player.joystickInput(x, y);
    }
  }

  addZombie(zombie) {
    this.zombies.push(zombie);
  }

  addBurger(id) {
    let player = this.players[id];
    if (player) {
      let burger = new Burger(player.position.x, player.position.y);
      console.log(["adding burger", burger]);
      this.burgers.push(burger);
    }
  }
}

