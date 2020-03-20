const smartEnding = (number, forms, base = '') => {
  const rest = number % 10;
  const last = number % 100;
  if (rest === 1 && last !== 11) return `${base}${forms[0]}`;
  if ([2, 3, 4].indexOf(rest) !== -1 && [12, 13, 14].indexOf(last) === -1) return `${base}${forms[1]}`;
  return `${base}${forms[2]}`;
};

export default smartEnding;
