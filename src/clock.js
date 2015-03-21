// Clock ticks at 4MHz, which means the CPU will fetch
// and execute a single instruction every 0.25µs.
function Clock(cpu) {
  this.cpu = cpu;

  // 10ms is usually the smallest interval on modern browsers.
  this.interval = 10;

  // Tick 40,000 times for every 10ms time slice.
  this.tickRate = 40000;
}

Clock.prototype.fire = function () {
  var i = this.tickRate;
  while (i--) this.cpu.tick();
};

Clock.prototype.startTicking = function () {
  setInterval(this.fire.bind(this), this.interval);
}
