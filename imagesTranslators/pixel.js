class Pixel {
  constructor([r, g, b, a]) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  invert() {
    const r = 255 - this.r;
    const g = 255 - this.g;
    const b = 255 - this.b;
    return [r, g, b, this.a];
  }

  blip() {
    const average = (this.r + this.g + this.b) / 3;
    return [average, average, average, this.a];
  }

}

module.exports = { Pixel };