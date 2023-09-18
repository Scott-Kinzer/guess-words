import React, {Dispatch, SetStateAction} from 'react';
import {RootStackParamList} from '../../types/route.screen.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMutation} from '@tanstack/react-query';
import {FormikErrors} from 'formik';
import {AxiosError} from 'axios';
import LoadingSpinner from '../../components/loader-components/Loader';
import {View} from 'react-native';
import AuthForm, {RegisterFields} from '../../components/forms/AuthForm';
import {registerRequest} from '../../services/register.service';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
};

const Register = ({navigation}: Props) => {
  const {mutate, isLoading} = useMutation(registerRequest);

  const makeLoginRequest = (
    data: RegisterFields,
    setErrors: Dispatch<SetStateAction<string>>,
    setFieldErrors: (errors: FormikErrors<RegisterFields>) => void,
  ) => {
    mutate(data, {
      onSuccess: response => {
        navigation.push('AuthPincode', {
          email: response.email,
        });
      },
      onError: error => {
        const errorAxios = error as AxiosError;

        if (errorAxios.response?.data) {
          const errorMessage = (errorAxios.response?.data as {message: string})
            ?.message;

          if (errorMessage.startsWith('"email"')) {
            setFieldErrors({email: 'Not valid email'});
          } else if (errorMessage.startsWith('"password"')) {
            setFieldErrors({password: 'Not valid password'});
          } else {
            setErrors('Incorrect data');
          }
        } else {
          setErrors('Incorrect data');
        }
      },
    });
  };

  return (
    <View>
      {isLoading && <LoadingSpinner />}
      <AuthForm navigation={navigation} makeRequest={makeLoginRequest} />
    </View>
  );
};

export default Register;
