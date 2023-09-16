import * as yup from 'yup';
import {loginFormValidation} from './login.validation';
import {PINCODE_TEMP} from '../form-data/form.data';

export const authFormValidation = {
  ...loginFormValidation,
};

export const pinCodeValidation = yup.object().shape(
  PINCODE_TEMP.reduce((acc, digit) => {
    acc[digit] = yup.string().required().min(1).max(1);
    return acc;
  }, {} as any),
);
