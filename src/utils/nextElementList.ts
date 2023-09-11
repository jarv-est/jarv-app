const nextElementList = <T>(list: T[], value: T) => {
  const currentValueIndex = list.indexOf(value);
  const nextIndex = (currentValueIndex + 1) % list.length;
  const nextValue = list[nextIndex];
  return nextValue;
};

export default nextElementList;