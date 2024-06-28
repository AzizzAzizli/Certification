// uppercase for first letter of word
export function uppercase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
//contains number
export function containsNumber(str) {
  const regex = /\d/;
  return regex.test(str);
}
