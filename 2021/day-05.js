const fs = require('fs');

const input = fs.readFileSync('./day-05-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const lines = input
    .split('\n')
    .map((line) =>
      line.split(' -> ').map((coords) => coords.split(',').map(Number))
    );
  const diagram = [];
  for (const [[x1, y1], [x2, y2]] of lines) {
    const dx = Math.sign(x2 - x1);
    const dy = Math.sign(y2 - y1);
    if (dx && dy && (part === 1 || Math.abs(dy / dx) !== 1)) {
      continue;
    }
    for (
      let x = x1, y = y1;
      (!dx || x !== x2 + dx) && (!dy || y !== y2 + dy);
      x += dx, y += dy
    ) {
      diagram[x] = diagram[x] ?? [];
      diagram[x][y] = (diagram[x][y] ?? 0) + 1;
    }
  }
  console.log(diagram.flat().filter((n) => n >= 2).length);
}

solve(input, 1);
solve(input, 2);
