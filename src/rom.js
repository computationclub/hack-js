function ROM(program) {
  this.instructions = program.map(function (bits) {
    return parseInt(bits, 2);
  });
}

ROM.prototype.get = function (addr) {
  var inst = this.instructions[addr];
  if (inst === undefined) {
    throw new Error("Out of bounds ROM access: " + addr);
  }
  return inst;
}
