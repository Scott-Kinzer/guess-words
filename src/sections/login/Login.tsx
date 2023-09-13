import React, {Dispatch, SetStateAction} from 'react';
import LoginForm, {LoginFields} from '../../components/forms/LoginForm';
import {RootStackParamList} from '../../types/route.screen.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMutation} from '@tanstack/react-query';
import {loginRequest} from '../../services/login.service';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const Login = ({navigation}: Props) => {
  const {mutate} = useMutation(loginRequest);

  const makeLoginRequest = (
    data: LoginFields,
    setErrors: Dispatch<SetStateAction<string>>,
  ) => {
    mutate(data, {
      onSuccess: () => {
        navigation.push('Category');
      },
      onError: () => {
        setErrors('Incorrect data');
      },
    });
  };

  return <LoginForm navigation={navigation} makeRequest={makeLoginRequest} />;
};

export default Login;
