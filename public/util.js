function outOfBounds() {
  let halfWidth = this.width * 0.5;
  let halfHeight = this.height * 0.5;

  if (this.position.x - halfWidth < 0) {
    return true;
  }

  if (this.position.x + halfWidth > width) {
    return true;
  }

  if (this.position.y - halfHeight > height) {
    return true;
  }

  if (this.position.y + halfHeight < 0) {
    return true;
  }
}

function bounds() {
  let halfWidth = this.width * 0.5;
  let halfHeight = this.height * 0.5;

  return {
    min: {
      x: this.position.x - halfWidth,
      y: this.position.y - halfHeight,
    },
    max: {
      x: this.position.x + halfHeight,
      y: this.position.y + halfHeight,
    },
  };
}

function overlaps(other) {
  let me = this.bounds();
  let them = other.bounds();

  // i'm to the right of them
  if (me.min.x > them.max.x) {
    return false;
  }

  // i'm to the left of them
  if (me.max.x < them.min.x) {
    return false;
  }

  // i'm entirely above them
  if (me.max.y < them.min.y) {
    return false;
  }

  // i'm entirely below them
  if (me.min.y > them.max.y) {
    return false;
  }

  return true;
}
