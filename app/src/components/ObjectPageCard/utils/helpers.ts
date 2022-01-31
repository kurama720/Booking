const abridgmentTextSymbols = 463;

export const getFullText = (text: string, active: boolean) => {
  if (text.length > abridgmentTextSymbols && active) {
    return text;
  }
  return text.slice(0, abridgmentTextSymbols);
};
