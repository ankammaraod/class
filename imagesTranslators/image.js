const fs = require('fs');
const jpeg = require('jpeg-js');
const { Pixel } = require('./pixel.js');

class Image {
  constructor(img) {
    this.img = img;
  }

  #read() {
    return fs.readFileSync(this.img);
  }

  #decode() {
    return jpeg.decode(this.#read());
  }

  #pixels() {
    const decoded = this.#decode();
    const pixels = []
    for (let i = 0; i < decoded.data.length; i = i + 4) {
      pixels.push(decoded.data.slice(i, i + 4));
    };
    return pixels;
  }

  #encode(decoded) {
    return jpeg.encode(decoded).data;
  }

  invert() {
    const decoded = this.#decode();

    const pixels = this.#pixels();
    const inverted = pixels.flatMap(pixel => {
      const pix = new Pixel(pixel);
      return pix.invert();
    })
    decoded.data = inverted;
    return this.#encode(decoded);
  }

  reverse() {
    const bytes = [];
    const decoded = this.#decode();
    const reversePixels = this.#pixels().reverse();
    reversePixels.forEach(x => bytes.push(...x));

    decoded.data = bytes;
    return this.#encode(decoded);
  }

  blip() {
    const decoded = this.#decode();

    const pixels = this.#pixels();
    const bliped = pixels.flatMap(pixel => {
      const pix = new Pixel(pixel);
      return pix.blur();
    })
    decoded.data = bliped;
    return this.#encode(decoded);
  }

  average(first, second, third, fourth) {
    const avgarr = [];
    for (let i = 0; i <= 3; i++) {
      try {
        const avg = Math.floor((first[i] + second[i] + third[i] + fourth[i]) / 4);
        avgarr.push(avg);
      } catch (error) {
      }
    };
    return avgarr;
  }

  blur() {
    const decoded = this.#decode();
    const pixels = this.#pixels();
    const blurred = []
    const blurredBytes = [];
    const width = decoded.width;
    for (let index = 0; index < pixels.length; index++) {
      const first = pixels[index];
      const second = pixels[index + 1];
      const third = pixels[index + width];
      const forth = pixels[index + 1 + width];
      const avg = this.average(first, second, third, forth);
      blurred.push(avg);
    }

    blurred.forEach(x => blurredBytes.push(...x))

    decoded.data = blurredBytes;
    return this.#encode(decoded);
  }

}

module.exports = { Image };

