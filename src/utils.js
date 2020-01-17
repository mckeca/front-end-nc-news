export const formatDates = date => {
  return date.slice(8, 10) + date.slice(4, 8) + date.slice(0, 4);
};
