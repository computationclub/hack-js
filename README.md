# hack-js

hack-js is a JavaScript implementation of the computer architecture from
the book "Elements of Computing Systems", which accompanies the [NAND to
Tetris course](http://www.nand2tetris.org).

hack-js uses a web browser to run .hack files containing machine code
instructions. An HTML5 canvas is used to display operations that draw
to the screen, and relevant keyboard events are forwarded to the Hack
program.

hack-js is a work in progress, and was inspired by the [London
Computation Club](http://london.computation.club) meet-up.

## Installing

The only dependency is Node.js. No third-party libraries required.

## Running

Use the `bin/run` binary to run a given Hack file. For example:

```
$ bin/run Pong.asm
Running Pong.asm at http://0.0.0.0:4225
```

This will launch a local web server on port 4225 ("HACK" on a phone
keypad). Navigating to http://0.0.0.0:4225 in a reasonably recent
browser will run the Hack program and display its output in a 256x512
HTML5 canvas element.
