function RAM() {
  // Memory could be very sparse, so an Array is out of the question.
  this.store = {};
}

RAM.prototype.get = function (idx) {
  return this.store[idx] || 0;
};

RAM.prototype.set = function (idx, value) {
  this.store[idx] = value;
};
