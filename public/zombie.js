class Zombie {
  constructor(options) {
    options = options || {};
    this.x = options.x;
    this.y = options.y;
    this.image = random(Images.zombies);
    this.alive = true;
  }

  update() {
    this.y += (deltaTime / 1000) * 16;
  }

  draw() {
    tint(Colors.DarkGreen);
    image(this.image, this.x, this.y, 64, 64);
    strokeWeight(4);
    stroke('#FF0000');
    point(this.x, this.y);
  }

  isDead() {
    return !this.alive || this.y > height;
  }
}

class ZombieSpawner {
  constructor(options) {
    options = options || {};
    this.game = options.game;
    this.minT = options.minT || 500;
    this.maxT = options.maxT || 3000;
    this.minX = options.minX || 0;
    this.maxX = options.maxX || 500;
    this.minY = options.minY || 100;
    this.maxY = options.maxY || 100;
    this.planNextSpawn();
  }

  planNextSpawn() {
    let t = random(this.minT, this.maxT);
    this.nextSpawn = setTimeout(() => this.spawnZombie(), t);
  }

  spawnZombie() {
    let zombie = new Zombie({
      x: random(this.minX, this.maxX),
      y: random(this.minY, this.maxY),
    });
    this.game.addZombie(zombie);
    this.planNextSpawn();
  }
}
