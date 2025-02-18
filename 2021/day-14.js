const fs = require('fs');

const input = fs.readFileSync('./day-14-input.txt', 'utf8').trimEnd();

function solve(input, nSteps) {
  const [template, rules] = input.split('\n\n');

  const nextPairs = rules.split('\n').reduce((acc, rule) => {
    const [left, right] = rule.split(' -> ');
    acc[left] = [left[0] + right, right + left[1]];
    return acc;
  }, {});

  let pairCounts = {};
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template.slice(i, i + 2);
    pairCounts[pair] = (pairCounts[pair] ?? 0) + 1;
  }

  for (let step = 0; step < nSteps; step++) {
    const nextPairCounts = {};
    for (const pair in pairCounts) {
      for (const nextPair of nextPairs[pair]) {
        nextPairCounts[nextPair] =
          (nextPairCounts[nextPair] ?? 0) + pairCounts[pair];
      }
    }
    pairCounts = nextPairCounts;
  }

  const elCounts = {
    [template[0]]: 1,
  };
  for (const pair in pairCounts) {
    elCounts[pair[1]] = (elCounts[pair[1]] ?? 0) + pairCounts[pair];
  }

  const elCountValues = Object.values(elCounts);
  console.log(Math.max(...elCountValues) - Math.min(...elCountValues));
}
solve(input, 10);
solve(input, 40);
