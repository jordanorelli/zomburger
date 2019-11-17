class Game {
  constructor (w, h) {
    this.w          = w;
    this.h          = h;
    this.players	  = {};
    this.numPlayers	= 0;
    this.id         = 0;
    this.colliders	= new Group();
    this.spawner    = new ZombieSpawner({
      game: this,
      minX: 0,
      maxX: w,
      minY: 0,
      maxY: 0,
    });
    this.zombies    = [];
    this.store      = new Store();
    this.bank       = new Bank();
  }

  add (id, x, y, w, h) {
    let player = new Player({
      id: id,
      x: x,
      y: y,
      width: w,
      height: h,
    })
    this.players[id] = player;
    // this.colliders.add(player.sprite);
    print(player.id + " added.");
    this.id++;
    this.numPlayers++;
  }

  update() {
    // this.checkBounds();
    this.zombies.forEach(z => z.update());
    for (let id in this.players) {
      let player = this.players[id];
      player.update();
    }
    this.zombies = this.zombies.filter(z => !z.isDead());
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
    // drawSprites();
  }

  setColor (id, r, g, b) {
    // this.players[id].sprite.color = color(r, g, b);
    // this.players[id].sprite.shapeColor = color(r, g, b);

    print(this.players[id].id + " color added.");
  }

  remove (id) {
      // this.colliders.remove(this.players[id].sprite);
      // this.players[id].sprite.remove();
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

  joystickInput(id, x, y) {
    let player = this.players[id];
    if (player) {
      player.joystickInput(x, y);
    }
  }

  checkBounds() {
      for (let id in this.players) {

          if (this.players[id].sprite.position.x < 0) {
              this.players[id].sprite.position.x = this.w - 1;
          }

          if (this.players[id].sprite.position.x > this.w) {
              this.players[id].sprite.position.x = 1;
          }

          if (this.players[id].sprite.position.y < 0) {
              this.players[id].sprite.position.y = this.h - 1;
          }

          if (this.players[id].sprite.position.y > this.h) {
              this.players[id].sprite.position.y = 1;
          }
      }
  }

  addZombie(zombie) {
    console.log(["adding zombie", zombie]);
    this.zombies.push(zombie);
  }
}

