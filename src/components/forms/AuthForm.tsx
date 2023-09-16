import {Formik, FormikErrors} from 'formik';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {Text, View} from 'react-native';
import * as yup from 'yup';
import {RootStackParamList} from '../../types/route.screen.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {authFormValidation} from './validations/auth.validation';
import StandardInput from '../inputs/StandardInput';
import PasswordInput from '../inputs/PasswordInput';
import RoundedButton from '../buttons/animated-buttons/RoundedButton';

export type RegisterFields = {
  email: string;
  password: string;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
  makeRequest: (
    data: RegisterFields,
    setErrors: Dispatch<SetStateAction<string>>,
    setFieldError: (errors: FormikErrors<RegisterFields>) => void,
  ) => void;
};

const AuthForm = ({navigation, makeRequest}: Props) => {
  const [serverError, setServerError] = useState('');

  return (
    <View>
      <Formik
        validateOnChange
        initialValues={{email: '', password: ''}}
        validationSchema={yup.object(authFormValidation)}
        onSubmit={(values, {setErrors}) => {
          makeRequest(values, setServerError, setErrors);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldTouched,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View>
              <StandardInput
                value={values.email}
                isTouched={!!touched.email}
                placeholder="email"
                error={errors.email}
                name="email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                setFieldsTouched={setFieldTouched}
              />
            </View>
            <View>
              <PasswordInput
                value={values.password}
                isTouched={!!touched.password}
                placeholder="password"
                error={errors.password}
                name="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                setFieldsTouched={setFieldTouched}
              />
            </View>

            {serverError && (
              <View>
                <Text>{serverError}</Text>
              </View>
            )}

            <View style={{marginTop: 20}}>
              <RoundedButton
                bgColor="#2f62ba"
                text="Sign up"
                pressHandler={e => {
                  handleSubmit(e);
                }}
              />
            </View>
            <View style={{marginTop: 10}}>
              <RoundedButton
                text="Go to login"
                pressHandler={() => navigation.push('Login')}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AuthForm;
