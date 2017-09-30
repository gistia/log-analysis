const assert = require('assert');

const readAhead = (line, pos) => {
  let i = pos;
  let count = 0;
  let res = '';
  while (true) {
    const ch = line[i];
    console.log(i, ch);
    i++;
    if (i > line.length) {
      console.error('Error!');
      break;
    }
    if (ch === '[') { count++; }
    if (ch === ']') {
      count--;
      if (count === 0) {
        break;
      }
    }
    res += ch;
  }
  return res.slice(1);
}

const res = readAhead('[name=Felipe, location=[lat=10, lon=20], age=38]', 0);
assert.equal(res, 'name=Felipe, location=[lat=10, lon=20], age=38');
