(function() {
  var RAM_MASK    = 1 << 14,
      SCREEN_MASK = 1 << 13;

  function Memory(ram, screen, keyboard) {
    this.ram = ram;
    this.screen = screen;
    this.keyboard = keyboard;
  }

  Memory.prototype.get = function (addr) {
    // If the top MSB is 0, then it falls within RAM.
    // If the second MSB is 0, then it's on the screen.
    // Otherwise, it's the keyboard.
    if (~addr & RAM_MASK) {
      return this.ram.get(addr);
    }

    if (~addr & SCREEN_MASK) {
      // Equivalent to addr - RAM_SIZE
      return this.screen.get(addr & (RAM_MASK - 1));
    }

    // Equivalent to addr - RAM_SIZE - SCREEN_SIZE
    return this.keyboard.get(addr & (SCREEN_MASK - 1));
  };

  Memory.prototype.set = function (addr, value) {
    if (~addr & RAM_MASK) {
      this.ram.set(addr, value);
    } else if (~addr & SCREEN_MASK) {
      this.screen.set(addr & (RAM_MASK - 1), value);
    } else {
      this.keyboard.set(addr & (SCREEN_MASK - 1), value);
    }
  };

  window.Memory = Memory;
})();
