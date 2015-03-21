document.addEventListener('DOMContentLoaded', function() {
  var rom      = new ROM(program),
      ram      = new RAM(),
      screen   = new Screen(document.getElementById('screen')),
      keyboard = new Keyboard(),
      memory   = new Memory(ram, screen, keyboard),
      alu      = new ALU(),
      cpu      = new CPU(alu, rom, memory),
      clock    = new Clock(cpu);

  clock.startTicking();
});
