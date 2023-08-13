import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import React, {FormEvent} from 'react';
import {View} from 'react-native';
import {RootStackParamList} from '../../types/route.screen.types';
import {loginFormValidation} from './validations/login.validation';
import * as yup from 'yup';
import StandardInput from '../inputs/StandardInput';
import PasswordInput from '../inputs/PasswordInput';
import RoundedButton from '../buttons/animated-buttons/RoundedButton';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginForm = ({navigation}: Props) => {
  return (
    <View>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={yup.object(loginFormValidation)}
        onSubmit={values => console.log(values)}>
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
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              setFieldsTouched={setFieldTouched}
            />
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

            <View style={{marginTop: 20}}>
              <RoundedButton
                bgColor="#ed7a0e"
                text="Sign in"
                pressHandler={e =>
                  handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
                }
              />
            </View>
            <View style={{marginTop: 10}}>
              <RoundedButton
                text="Go to auth"
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