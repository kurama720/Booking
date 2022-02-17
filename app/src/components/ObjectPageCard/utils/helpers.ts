const abridgmentTextSymbols = 463;

export const getFullText = (text: string, active: boolean) => {
  if (text.length > abridgmentTextSymbols && active) {
    return text;
  }
  return text.slice(0, abridgmentTextSymbols);
};

export const isEven = (num: number) => num % 2 === 0;

export const isLastIndex = (length: number, index: number) =>
  length - 1 === index;
