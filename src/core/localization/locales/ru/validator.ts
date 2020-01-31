import { ValidatorTranslation } from "../types";

export const validator: ValidatorTranslation = {
  greaterThan: 'количество символов должно быть больше, чем {amount}',
  lessThan: 'количество символов должно быть меньше, чем {amount}',
  equal: 'количество символов должно соответсвовать {amount}',
  invalid: 'поле {field} не валидно',
  letters: 'поле {field} должно содержать только буквы',
  digits: 'поле {field} должно содержать только цифры',
  required: 'поле {field} обязательно к заполнению'
};
