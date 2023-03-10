export const replaceStr = (str: string): string => {
  if (str.includes('.')) return str.replace('.', ',');
  return str.replace(',', '.');
};
