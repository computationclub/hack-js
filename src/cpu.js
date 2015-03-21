(function() {
  var I_MASK  = 1 << 15,
      A_MASK  = 1 << 12,
      C1_MASK = 1 << 11,
      C2_MASK = 1 << 10,
      C3_MASK = 1 << 9,
      C4_MASK = 1 << 8,
      C5_MASK = 1 << 7,
      C6_MASK = 1 << 6,
      D1_MASK = 1 << 5,
      D2_MASK = 1 << 4,
      D3_MASK = 1 << 3,
      J1_MASK = 1 << 2,
      J2_MASK = 1 << 1,
      J3_MASK = 1;

  function CPU(alu, rom, memory) {
    this.ALU    = alu;
    this.ROM    = rom;
    this.memory = memory;

    this.PC        = 0; // Program Counter
    this.ARegister = 0;
    this.DRegister = 0;
  }

  CPU.prototype.tick = function () {
    var inst = this.fetch();
    this.execute(inst);
  };

  CPU.prototype.fetch = function () {
    return this.ROM.get(this.PC);
  };

  CPU.prototype.execute = function (inst) {
    if (inst & I_MASK) {
      this.executeC(inst);
    } else {
      this.executeA(inst);
    }
  };

  CPU.prototype.executeA = function (inst) {
    // This is a bit hacky. Because the format of an A-instruction is:
    // a leading 0, followed by the constant we wish to load into
    // memory, we don't need to zero-out the extra leading bit, and
    // can just treat the entire instruction as the numeric constant.
    this.ARegister = inst;
    this.PC++;
  };

  CPU.prototype.executeC = function (inst) {
    var y, jump;

    if (inst & A_MASK) {
      y = this.memory.get(this.ARegister);
    } else {
      y = this.ARegister;
    }

    this.ALU.set(
      this.DRegister,
      y,
      inst & C1_MASK,
      inst & C2_MASK,
      inst & C3_MASK,
      inst & C4_MASK,
      inst & C5_MASK,
      inst & C6_MASK
    );

    // If the ALU's output needs to be written to memory, we must do
    // it before the contents of the A register have a chance to be
    // overwritten below, if the D1 destination bit is positive.
    if (inst & D3_MASK) {
      this.memory.set(this.ARegister, this.ALU.output);
    }
    if (inst & D2_MASK) {
      this.DRegister = this.ALU.output;
    }
    if (inst & D1_MASK) {
      this.ARegister = this.ALU.output;
    }

    jump = (inst & J1_MASK) && this.ALU.isNegative || // JLT
           (inst & J2_MASK) && this.ALU.isZero     || // JEQ
           (inst & J3_MASK) && this.ALU.isPositive;   // JGT

    if (jump) {
      this.PC = this.ARegister;
    } else {
      this.PC++;
    }
  };

  window.CPU = CPU;
})();
