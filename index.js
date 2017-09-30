const fs = require('fs');
const line = fs.readFileSync(process.argv[2], 'utf8');

const readAhead = (line, pos) => {
  let i = pos;
  let count = 0;
  let res = '';
  while (true) {
    const ch = line[i];
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

const parse = (line) => {
  let acc = '';
  let field = '';
  let value = '';
  const res = [];
  let i = 0;
  while (i < line.length) {
    const ch = line.charAt(i);
    if (field && ch === '[') {
      const chunk = readAhead(line, i) + ',';
      const child = parse(chunk);
      res.push([field.trim(), child]);
      i += child.length + 1;
    }
    i++;
    if (ch === '=' && !field) {
      field = acc;
      acc = '';
      continue;
    }
    if (ch === ',') {
      res.push([field.trim(), acc]);
      field = '';
      acc = '';
      continue;
    }
    acc += ch;
  }
  return res;
};

const res = parse(line);
console.log(JSON.stringify(res, null, 2));
