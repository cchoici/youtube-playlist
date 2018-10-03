export const formatTime = seconds => {
  const date = new Date(null);
  date.setSeconds(seconds);
  const arr = [seconds >= 3600 ? 11 : 14, seconds >= 3600 ? 8 : 5];
  return date.toISOString().substr(...arr);
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
