import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Formik, FormikErrors} from 'formik';
import React, {Dispatch, FormEvent, SetStateAction, useState} from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from '../../types/route.screen.types';
import {loginFormValidation} from './validations/login.validation';
import * as yup from 'yup';
import StandardInput from '../inputs/StandardInput';
import PasswordInput from '../inputs/PasswordInput';
import RoundedButton from '../buttons/animated-buttons/RoundedButton';

export type LoginFields = {
  email: string;
  password: string;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
  makeRequest: (
    data: LoginFields,
    setErrors: Dispatch<SetStateAction<string>>,
    setFieldError: (errors: FormikErrors<LoginFields>) => void,
  ) => void;
};

const LoginForm = ({navigation, makeRequest}: Props) => {
  const [serverError, setServerError] = useState('');

  return (
    <View>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={yup.object(loginFormValidation)}
        onSubmit={(values, {setErrors}) => {
          makeRequest(values, setServerError, setErrors);
        }}>
        {({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldTouched,
        }) => (
          <View>
            <StandardInput
              value={values.email}
              isTouched={!!touched.email}
              placeholder="email"
              error={errors.email}
              name="email"
              onChangeText={e => {
                setServerError('');
                return handleChange('email')(e);
              }}
              onBlur={handleBlur('email')}
              setFieldsTouched={setFieldTouched}
            />
            <PasswordInput
              value={values.password}
              isTouched={!!touched.password}
              placeholder="password"
              error={errors.password}
              name="password"
              onChangeText={e => {
                setServerError('');
                handleChange('password')(e);
              }}
              onBlur={handleBlur('password')}
              setFieldsTouched={setFieldTouched}
            />

            {serverError && (
              <View>
                <Text>{serverError}</Text>
              </View>
            )}

            <View style={{marginTop: 20}}>
              <RoundedButton
                bgColor={Object.keys(errors).length === 0 ? '#ed7a0e' : 'grey'}
                text="Sign in"
                pressHandler={e => {
                  if (Object.keys(errors).length === 0) {
                    handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
                  }
                }}
              />
            </View>
            <View style={{marginTop: 10}}>
              <RoundedButton
                text="Go to register"
                pressHandler={() => navigation.push('Auth')}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;
