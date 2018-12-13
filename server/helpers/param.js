const isInteger = (x) => {
  return x % 1 === 0 && x.toString().indexOf('.') === -1;
};

export default isInteger;
