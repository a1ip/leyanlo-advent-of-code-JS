const fs = require('fs');

var input = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`;
var input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();

function solve(input) {
  let [state, rules] = input.replace(/\./g, ' ').split('\n\n');
  state = state.split(': ')[1];
  rules = rules
    .split('\n')
    .map((rule) => rule.split(' => '))
    .reduce((acc, [left, right]) => {
      acc[left] = right;
      return acc;
    }, {});
  let sum = 0;
  let prevDiff;
  let sameCount = 0;
  for (let i = 0; i < 1000; i++) {
    state = state.padStart(state.length + 3, ' ');
    state = state.padEnd(state.length + 3, ' ');
    const nextState = [];
    for (let i = 0; i <= state.length - 5; i++) {
      nextState.push(rules[state.substring(i, i + 5)] ?? ' ');
    }
    state = nextState.join('');
    const nextSum = nextState
      .map((c, idx) => (c === '#' ? idx - i - 1 : 0))
      .reduce((acc, n) => acc + n);
    const diff = nextSum - sum;
    console.log(i, nextSum, diff, state);
    if (diff === prevDiff) {
      sameCount++;
      if (sameCount === 10) {
        console.log(sum + diff * (50000000000 - i));
        break;
      }
    } else {
      sameCount = 0;
    }
    prevDiff = diff;
    sum = nextSum;
  }
}
solve(input);
