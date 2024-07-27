export const removeExtraneousCharacters = (text: string) => {
  return text.replaceAll('', ' ');
};

const RE_REMOVE_EXTRA_COMMA = /(,)($[\s\n]{1,}[\]\}])/gm;

export const parseJsonAndResolveComma = <T>(text: string): T => {
  const result = text.replace(RE_REMOVE_EXTRA_COMMA, '$2');

  return JSON.parse(result);
};

export const ONE_SECOND_IN_MS = 1000;
