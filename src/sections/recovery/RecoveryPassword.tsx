import {Formik, FormikErrors} from 'formik';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {Text, View} from 'react-native';
import * as yup from 'yup';
import RoundedButton from '../../components/buttons/animated-buttons/RoundedButton';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {updatePasswordRequest} from '../../services/login.service';
import PasswordInput from '../../components/inputs/PasswordInput';
import {passwordFormValidation} from '../../components/forms/validations/login.validation';
import {RootStackParamList} from '../../types/route.screen.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Fields = {
  password: string;
};

type Props = {
  email: string;
  pincode: string;
  navigation: NativeStackNavigationProp<RootStackParamList, 'PasswordRecovery'>;
};

const RecoveryPassword = ({email, pincode, navigation}: Props) => {
  const [serverError, setServerError] = useState('');
  const {mutate} = useMutation(updatePasswordRequest);

  const passwordRequest = (
    data: Fields,
    setErrors: Dispatch<SetStateAction<string>>,
    setFieldErrors: (errors: FormikErrors<Fields>) => void,
  ) => {
    mutate(
      {...data, email, pincode},
      {
        onSuccess: () => {
          navigation.navigate('Login');
        },
        onError: error => {
          const errorAxios = error as AxiosError;
          if (errorAxios.response?.data) {
            const errorMessage = (
              errorAxios.response?.data as {message: string}
            )?.message;

            if (errorMessage.startsWith('"password"')) {
              setFieldErrors({password: 'Not valid password'});
            } else {
              setErrors('Incorrect data');
            }
          } else {
            setErrors('Incorrect data');
          }
        },
      },
    );
  };

  return (
    <View>
      <Formik
        validateOnChange
        initialValues={{password: ''}}
        validationSchema={yup.object(passwordFormValidation)}
        onSubmit={(values, {setErrors}) => {
          passwordRequest(values, setServerError, setErrors);
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
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RecoveryPassword;
