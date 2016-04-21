(function() {
  var WIDTH  = 512,
      HEIGHT = 256;

  function Screen(elem) {
    this.canvas = elem.getContext('2d');
    this.image  = this.canvas.createImageData(WIDTH, HEIGHT);
    this.store  = {};
  }

  Screen.prototype.get = function (addr) {
    return this.store[addr] || 0;
  };

  Screen.prototype.set = function (addr, value) {
    this.store[addr] = value;
    this.redrawPixels(addr, value);
  };

  Screen.prototype.redrawPixels = function (addr, bits) {
    var offset = 16 * addr,  // Each address corresponds to 16 horizontal pixels.
        idx = offset << 2,   // Multiply offset by 4 because each pixel has RGBA components.
        colour;

    // We need to loop over all 16 bits stored at addr.
    for (var i = 0; i < 16; i++) {
      // Examine the ith bit: true means black, false means white.
      colour = bits & (1 << i) ? 0 : 255;

      // Set the RGB components of the pixel.
      this.image.data[idx++] = colour;
      this.image.data[idx++] = colour;
      this.image.data[idx++] = colour;

      // Always set alpha to 255 (opaque).
      this.image.data[idx++] = 255;
    }

    this.canvas.putImageData(this.image, 0, 0);
  };

  window.Screen = Screen;
})();
