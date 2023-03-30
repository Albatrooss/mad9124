// factoral
// 1 * 2 * 3 * 4 * 5

const factoral = (n) => {
  if (n === 1) return 1;

  return factoral(n - 1) * n;
};

console.log(1 * 2 * 3 * 4 * 5);
console.log(factoral(5));
