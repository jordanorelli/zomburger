class Game {
  constructor (w, h) {
    this.w          = w;
    this.h          = h;
    this.players	  = {};
    this.numPlayers	= 0;
    this.id         = 0;
    this.spawner    = new ZombieSpawner({
      game: this,
      minX: 0,
      maxX: w,
      minY: 0,
      maxY: 0,
    });
    this.zombies    = [];
    this.burgers = [];
    this.store      = new Store();
    this.bank       = new Bank();
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
    }

    for (let burger of this.burgers) {
      for (let zombie of this.zombies) {
        if (burger.overlaps(zombie)) {
          burger.kill();
          zombie.kill();
          break;
        }
      }
    }

    this.zombies = this.zombies.filter(z => !z.isDead());
    this.burgers = this.burgers.filter(b => !b.isDead());
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
  }

  remove (id) {
      delete this.players[id];
      this.numPlayers--;
  }

  checkId (id) {
      if (id in this.players) { return true; }
      else { return false; }
  }

  printPlayerIds (x, y) {
      push();
      noStroke();
      fill(Colors.Eggplant);
      textSize(16);
      text("# players: " + this.numPlayers, x, y);

      y = y + 16;
      fill(Colors.Eggplant);
      for (let id in this.players) {
          text(this.players[id].id, x, y);
          y += 16;
      }

      pop();
  }

  buttonInput(id, val) {
    console.log(["game sees button input", [id, val]]);
    let player = this.players[id];
    if (player) {
      console.log(["button input has player", player]);
      player.buttonInput(val);
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

