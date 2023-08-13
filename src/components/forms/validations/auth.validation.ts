import * as yup from 'yup';
import {loginFormValidation} from './login.validation';

export const authFormValidation = {
  name: yup.string().required('Name is required.'),
  ...loginFormValidation,
};
