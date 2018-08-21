export const formatTime = seconds => {
  const date = new Date(null);
  date.setSeconds(seconds);
  const arr = [seconds >= 3600 ? 11 : 14, seconds >= 3600 ? 8 : 5];
  return date.toISOString().substr(...arr);
}

export const formatTime2 = () => null;
