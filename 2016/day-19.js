const fs = require('fs');

var input = `5`;
var input = fs.readFileSync('./day-19-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   console.log(input);
//   const nElves = +input;
//   const elves = [...Array(nElves).keys()].map((i) => (i + 1) % nElves);
//   console.log(elves);
//   let i = 0;
//   for (let j = 0; j < nElves - 1; j++) {
//     elves[i] = elves[elves[i]];
//     i = elves[i];
//   }
//   console.log(i + 1);
// }
// solve(input);
function solve(input) {
  console.log(input);
  const nElves = +input;
  const elves = [...Array(nElves).keys()].map((i) => i + 1);
  console.log(elves);
  let i = 0;
  for (let j = 0; j < nElves - 1; j++) {
    const remove = (i + ~~(elves.length / 2)) % elves.length;
    elves.splice(remove, 1);
    i = (i + (remove > i)) % elves.length;
  }
  console.log(elves[0]);
}
solve(input);
