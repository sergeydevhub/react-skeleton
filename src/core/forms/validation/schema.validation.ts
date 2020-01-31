const isEmail = (val: string): val is string => /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
const isLetters = (val: string): val is string => /^[A-Za-z]+$/.test(val);
const isDigits = (val: string): boolean => /^\d*$/.test(val);
const isObject = (val: any): val is {} => typeof val === 'object' && Boolean(val);
const toDigits = (val: string): string => val.replace(/\D/g,'');
const toNumber = (val: string): number => Number(toDigits(val));

export const schema = {
  greater: { than: (val: string, target: number): boolean => toNumber(val) > target },
  less: { than: (val: string, target: number): boolean => toNumber(val) < target },
  equal: (val: string, target: number) => toNumber(val) === target,
  email: isEmail,
  letters: isLetters,
  digits: isDigits,
  required: (val: any): boolean => Boolean(val)
};
