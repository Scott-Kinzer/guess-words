import React, {Dispatch, SetStateAction, useContext} from 'react';
import LoginForm, {LoginFields} from '../../components/forms/LoginForm';
import {RootStackParamList} from '../../types/route.screen.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMutation} from '@tanstack/react-query';
import {loginRequest} from '../../services/login.service';
import {FormikErrors} from 'formik';
import {AxiosError} from 'axios';
import LoadingSpinner from '../../components/loader-components/Loader';
import {View} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const Login = ({navigation}: Props) => {
  const {mutate, isLoading} = useMutation(loginRequest);
  const authData = useContext(AuthContext);

  const makeLoginRequest = (
    data: LoginFields,
    setErrors: Dispatch<SetStateAction<string>>,
    setFieldErrors: (errors: FormikErrors<LoginFields>) => void,
  ) => {
    mutate(data, {
      onSuccess: tokens => {
        authData?.setTokens(tokens.accessToken, tokens.refreshToken);
        navigation.push('Category');
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
      <LoginForm navigation={navigation} makeRequest={makeLoginRequest} />
    </View>
  );
};

export default Login;
