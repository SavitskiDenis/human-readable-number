const numbersAndNames = new Map([
  [0, 'zero'],
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
  [4, 'four'],
  [5, 'five'],
  [6, 'six'],
  [7, 'seven'],
  [8, 'eight'],
  [9, 'nine'],
  [10, 'ten'],
  [11, 'eleven'],
  [12, 'twelve'],
  [13, 'thirteen'],
  [15, 'fifteen'],
  [18, 'eighteen'],
  [20, 'twenty'],
  [30, 'thirty'],
  [40, 'forty'],
  [50, 'fifty'],
  [80, 'eighty']
])

const toReadableLessTwentyOne = (number) => {
  let res = '';
  if (number > 0 && number <= 20) {
    if (numbersAndNames.has(number)) {
      res = numbersAndNames.get(number);
    } else {
      const divRem = number % 10;
      if (numbersAndNames.has(divRem)) {
        res = `${numbersAndNames.get(divRem)}teen`;
      }
    }
  }
  return res;
}

const toReadableLessHundred = (number) => {
  let res = '';
  if (number < 100 && number > 20) {
    const divRem = number % 10;
    number -= divRem;
    res += numbersAndNames.has(number) ? numbersAndNames.get(number)
      : `${numbersAndNames.get(Math.floor(number / 10))}ty`;
    if (divRem > 0 && numbersAndNames.has(divRem)) {
      res += ` ${numbersAndNames.get(divRem)}`;
    }
  }
  return res;
}

const toReadableLessThousand = (number) => {
  let res = '';
  if (number >= 100 && number < 1000) {
    const divRem = number % 100;
    number = Math.floor(number / 100);
    if (number > 0 && numbersAndNames.has(number)) {
      res += `${numbersAndNames.get(number)} hundred`;
    }
    const lessH = divRem < 21 ? toReadableLessTwentyOne(divRem) : toReadableLessHundred(divRem);
    if (lessH) {
      if (res !== '') {
        res += ' ';
      }
      res += lessH;
    }
  }
  return res;
}

module.exports = function toReadable (number) {
  const readableF = numbersAndNames.has(number) ? (n) => numbersAndNames.get(n)
    : number < 21 ? toReadableLessTwentyOne
    : number < 100 && number > 20 ? toReadableLessHundred
    : number >= 100 && number < 1000 ? toReadableLessThousand : undefined
  return readableF ? readableF(number) : '';
}