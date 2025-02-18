const fs = require('fs');

const input = fs.readFileSync('./day-06-input.txt', 'utf8').trimEnd();

const debug = false;

function solve1(input) {
  const coords = input.split('\n').map((line) => line.split(', ').map(Number));
  debug && console.log(coords);
  const [maxX, maxY] = coords.reduce(
    ([maxX, maxY], [x, y]) => [Math.max(x + 1, maxX), Math.max(y + 1, maxY)],
    coords[0]
  );
  debug && console.log([maxX, maxY]);
  const grid = Array(maxY)
    .fill()
    .map(() => Array(maxX).fill(-1));
  debug &&
    console.log(
      grid
        .map((line) => line.map((i) => String(i).padStart(2, ' ')).join(' '))
        .join('\n'),
      '\n'
    );
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      let closest = {
        i: null,
        dist: Infinity,
      };
      for (let i = 0; i < coords.length; i++) {
        const [coordX, coordY] = coords[i];
        const dist = Math.abs(coordX - x) + Math.abs(coordY - y);
        if (dist < closest.dist) {
          closest = { i, dist };
        } else if (dist === closest.dist) {
          closest = { i: -1, dist };
        }
      }
      grid[y][x] = closest.i;
    }
  }
  debug &&
    console.log(
      grid
        .map((line) => line.map((i) => String(i).padStart(2, ' ')).join(' '))
        .join('\n'),
      '\n'
    );
  const candidates = new Set(coords.keys());
  debug && console.log(candidates);
  for (let y = 0; y < maxY; y++) {
    candidates.delete(grid[y][0]);
    candidates.delete(grid[y][maxX - 1]);
  }
  for (let x = 0; x < maxX; x++) {
    candidates.delete(grid[0][x]);
    candidates.delete(grid[maxY - 1][x]);
  }
  debug && console.log(candidates);
  let largest = {
    c: null,
    area: -1,
  };
  for (const c of candidates) {
    const area = grid.flat().filter((i) => i === c).length;
    if (area > largest.area) {
      largest = { c, area };
    }
  }
  console.log(largest.area);
}

solve1(input);

function solve2(input) {
  const coords = input.split('\n').map((line) => line.split(', ').map(Number));
  debug && console.log(coords);
  const [maxX, maxY] = coords.reduce(
    ([maxX, maxY], [x, y]) => [Math.max(x + 1, maxX), Math.max(y + 1, maxY)],
    coords[0]
  );
  debug && console.log([maxX, maxY]);
  const grid = Array(maxY)
    .fill()
    .map(() => Array(maxX).fill(-1));
  debug &&
    console.log(
      grid
        .map((line) => line.map((i) => String(i).padStart(2, ' ')).join(' '))
        .join('\n'),
      '\n'
    );
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      grid[y][x] = coords.reduce(
        (dist, [coordX, coordY]) =>
          dist + Math.abs(coordX - x) + Math.abs(coordY - y),
        0
      );
    }
  }
  debug &&
    console.log(
      grid
        .map((line) => line.map((i) => String(i).padStart(2, ' ')).join(' '))
        .join('\n'),
      '\n'
    );
  const area = grid.flat().filter((d) => d < 10000).length;
  console.log(area);
}

solve2(input);
