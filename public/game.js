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
      maxY: 100,
    });
    this.zombies    = [];
    this.store      = new Store();
    this.bank       = new Bank();
  }

  add (id, x, y, w, h) {
    this.players[id] = createSprite(x, y, w, h);
    this.players[id].id = "p"+this.id;
    this.players[id].setCollider("rectangle", 0, 0, w, h);
    this.players[id].color = color(255, 255, 255);
    this.players[id].shapeColor = color(255, 255, 255);
    this.players[id].scale = 1;
    this.players[id].mass = 1;
    this.colliders.add(this.players[id]);
    print(this.players[id].id + " added.");
    this.id++;
    this.numPlayers++;
  }

  update() {
    this.checkBounds();
    this.zombies.forEach(z => z.update());
    this.zombies = this.zombies.filter(z => !z.isDead());
  }

  draw() {
    this.update();
    this.bank.draw(width*0.25 - 64, height - 128 - 32, 128, 128);
    this.store.draw(width*0.75 - 64, height - 128 - 32, 128, 128);
    this.zombies.forEach(z => z.draw());
    drawSprites();
  }

  setColor (id, r, g, b) {
    this.players[id].color = color(r, g, b);
    this.players[id].shapeColor = color(r, g, b);

    print(this.players[id].id + " color added.");
  }

  remove (id) {
      this.colliders.remove(this.players[id]);
      this.players[id].remove();
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

  setVelocity(id, velx, vely) {
      this.players[id].velocity.x = velx;
      this.players[id].velocity.y = vely;
  }

  checkBounds() {
      for (let id in this.players) {

          if (this.players[id].position.x < 0) {
              this.players[id].position.x = this.w - 1;
          }

          if (this.players[id].position.x > this.w) {
              this.players[id].position.x = 1;
          }

          if (this.players[id].position.y < 0) {
              this.players[id].position.y = this.h - 1;
          }

          if (this.players[id].position.y > this.h) {
              this.players[id].position.y = 1;
          }
      }
  }

  addZombie(zombie) {
    console.log(["adding zombie", zombie]);
    this.zombies.push(zombie);
  }
}

