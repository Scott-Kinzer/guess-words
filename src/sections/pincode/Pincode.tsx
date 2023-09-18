import React, {Dispatch, SetStateAction, useContext} from 'react';
import {RootStackParamList} from '../../types/route.screen.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import LoadingSpinner from '../../components/loader-components/Loader';
import {View} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import PincodeForm from '../../components/forms/PincodeForm';
import {pincodeRequest} from '../../services/register.service';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AuthPincode'>;
  email: string;
};

const Pincode = ({navigation, email}: Props) => {
  const {mutate, isLoading} = useMutation(pincodeRequest);
  const authData = useContext(AuthContext);

  const makeLoginRequest = (
    data: {[x: string]: string},
    setErrors: Dispatch<SetStateAction<string>>,
  ) => {
    let pincode = '';

    for (let key in data) {
      pincode += data[key];
    }

    const requestData = {
      email,
      pincode,
    };

    mutate(requestData, {
      onSuccess: tokens => {
        authData?.setTokens(tokens.accessToken, tokens.refreshToken);
        navigation.push('Category');
      },
      onError: error => {
        const errorAxios = error as AxiosError;

        if (errorAxios.response?.data) {
          const errorMessage = (errorAxios.response?.data as {message: string})
            ?.message;

          if (errorMessage.startsWith('"pincode"')) {
            setErrors('Not valid pincode');
            return;
          }

          setErrors(errorMessage);
        } else {
          setErrors('Incorrect data');
        }
      },
    });
  };

  return (
    <View>
      <PincodeForm navigation={navigation} makeRequest={makeLoginRequest} />
      {isLoading && <LoadingSpinner />}
    </View>
  );
};

export default Pincode;
