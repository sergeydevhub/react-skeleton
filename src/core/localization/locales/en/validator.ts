import { ValidatorTranslation } from "../types";

export const validator: ValidatorTranslation = {
  greaterThan: 'amount of characters should be greater than {amount}',
  lessThan: 'amount of characters should be less than {amount}',
  equal: 'amount of characters should be equal {amount}',
  invalid: '{field} is not valid',
  letters: '{field} should contains only letters',
  digits: '{field} should contains only digits',
  required: '{field} is required'
};
