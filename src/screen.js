(function() {
  var X_MASK   = (1 << 9) - 1,
      MSB_MASK = 1 << 15;

  function Screen(elem) {
    this.canvas = elem.getContext('2d');
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
        x = offset & X_MASK, // Modulo: offset & (COLUMNS - 1) = offset % COLUMNS
        y = offset >> 9,     // Integer division: offset >> log2(COLUMNS) == Math.floor(offset / COLUMNS)
        run = 1,             // run will hold how many contiguous pixels with the same colour we've seen.
        prev,                // prev will hold the colour of the previous pixel in the loop.
        colour;              // colour will hold the current pixel's colour.

    // Initialise prev to be the colour corresponding to the MSB.
    // This way we can skip the first iteration of the loop below.
    prev = (bits & MSB_MASK) ? 'black' : 'white';

    // We need to loop over 16 bits, but as we've already peeked
    // at the first one, this loop can start from 15 instead.
    //
    // Note that this loop runs from the MSB (rightmost pixel)
    // to the LSB (leftmost pixel). Having a decrementing loop
    // with no bounds checking gives us a tiny speed boost, but
    // more importantly it makes our drawing code easier below.
    for (var i = 15; i--;) {
      colour = (bits & (1 << i)) ? 'black' : 'white';

      // If this pixel's colour is the same as the previous pixel's
      // colour, increase the length of the current "run" and move
      // on to the next pixel before we do any drawing.
      if (prev == colour) {
        run++;
        continue;
      }

      // If the run has ended, we need to draw the block of pixels
      // up to, but excluding, the current one. As we're iterating
      // from right to left, we can draw a rectangle starting at
      // the previous pixel (x + i + 1), with length run.
      this.canvas.fillStyle = prev;
      this.canvas.fillRect(x + i + 1, y, run, 1);

      // Start a new run of length 1 for the current pixel's colour.
      prev = colour;
      run = 1;
    }

    // Now that we've processed all the pixels, we can draw the last
    // (leftmost) run of pixels, which may have length from 1 to 16.
    this.canvas.fillStyle = colour;
    this.canvas.fillRect(x, y, run, 1);
  };

  window.Screen = Screen;
})();
