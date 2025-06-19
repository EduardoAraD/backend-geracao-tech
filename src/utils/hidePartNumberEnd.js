export function hidePartNumberEnd(number) {
  const numberString = number.toString();
  const lengthHidden = numberString.length > 4 ? numberString.length - 4 : Math.floor(numberString.length / 2);
  const partHidden = '*'.repeat(lengthHidden);
  const partVisible = numberString.slice(lengthHidden);

  return partHidden + partVisible;
}
