function ALU() {
  this.output = 0;
  this.isZero = true;
  this.isNegative = false;
  this.isPositive = false;
}

ALU.prototype.set = function (x, y, zx, nx, zy, ny, f, no) {
  var out;

  if (zx) x = 0;
  if (nx) x = ~x;
  if (zy) y = 0;
  if (ny) y = ~y;

  out = f ? x + y : x & y;

  if (no) out = ~out;

  this.output = out;
  this.isZero = out === 0;
  this.isNegative = out < 0;
  this.isPositive = out > 0;
};
