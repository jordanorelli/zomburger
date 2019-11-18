class Zombie {
  constructor(options) {
    options = options || {};
    this.position = {
      x: options.x,
      y: options.y
    };
    this.velocity = {
      x: 0,
      y: 16,
    };
    this.image = random(Images.zombies);
    this.alive = true;
    this.height = 64;
    this.width = 64;
  }

  update() {
    let dt = deltaTime / 1000;
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
  }

  draw() {
    tint(Colors.DarkGreen);
    image(this.image, this.position.x - 32, this.position.y - 32, 64, 64);
    
    if (debug) {
      strokeWeight(4);
      stroke('#FF0000');
      point(this.position.x, this.position.y);
      strokeWeight(1);
      noFill();
      rect(this.position.x - 32, this.position.y - 32, 64, 64);
    }
  }

  kill() {
    this.alive = false;
  }

  isDead() {
    return !this.alive || this.outOfBounds();
  }
}

Zombie.prototype.bounds = bounds;
Zombie.prototype.outOfBounds = outOfBounds;
Zombie.prototype.overlaps = overlaps;

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
