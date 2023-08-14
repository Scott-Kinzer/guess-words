import {Formik} from 'formik';
import React, {FormEvent} from 'react';
import {View} from 'react-native';
import * as yup from 'yup';
import {RootStackParamList} from '../../types/route.screen.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {authFormValidation} from './validations/auth.validation';
import StandardInput from '../inputs/StandardInput';
import PasswordInput from '../inputs/PasswordInput';
import RoundedButton from '../buttons/animated-buttons/RoundedButton';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
};

const AuthForm = ({navigation}: Props) => (
  <View>
    <Formik
      validateOnChange
      initialValues={{email: '', name: '', password: ''}}
      validationSchema={yup.object(authFormValidation)}
      onSubmit={() => navigation.push('AuthPincode')}>
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
              value={values.name}
              isTouched={!!touched.name}
              placeholder="name"
              error={errors.name}
              name="name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              setFieldsTouched={setFieldTouched}
            />
          </View>
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
              bgColor="#2f62ba"
              text="Sign up"
              pressHandler={e =>
                handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
              }
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

export default AuthForm;
