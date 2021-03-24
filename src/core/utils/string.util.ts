export const snakeToCamelCase = (
  str: string
): string => str.replace(
  /([-_][a-z])/g,
  (group) => group.toUpperCase()
    .replace('-', '')
    .replace('_', '')
);

export const camelToSnakeCase = (str: string): string => {
  return Array.from(str)
    .map(char => char === char.toUpperCase() ? '_' + char.toLowerCase() : char)
    .join();
};

export const getBaseURL = (): string => `${ process.env.PROTOCOL }://${ process.env.HOSTNAME }:${ process.env.PORT }/api/${ process.env.API_VERSION }`;
