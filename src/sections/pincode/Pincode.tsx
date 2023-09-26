import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import {RootStackParamList} from '../../types/route.screen.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import LoadingSpinner from '../../components/loader-components/Loader';
import {View} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import PincodeForm from '../../components/forms/PincodeForm';
import {
  pincodeRequest,
  resendPincodeRequest,
} from '../../services/register.service';
import RoundedButton from '../../components/buttons/animated-buttons/RoundedButton';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AuthPincode'>;
  email: string;
};

const Pincode = ({navigation, email}: Props) => {
  const {mutate} = useMutation(pincodeRequest);
  const {mutate: mutateRequestPincode} = useMutation(resendPincodeRequest);
  const authData = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const makeLoginRequest = (
    data: {[x: string]: string},
    setErrors: Dispatch<SetStateAction<string>>,
  ) => {
    let pincode = '';
    setIsLoading(true);

    for (let key in data) {
      pincode += data[key];
    }

    const requestData = {
      email,
      pincode,
    };

    mutate(requestData, {
      onSuccess: tokens => {
        setIsLoading(false);
        authData?.setTokens(tokens.accessToken, tokens.refreshToken);
        navigation.push('Category');
      },
      onError: error => {
        setIsLoading(false);
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

  const resendPincode = () => {
    setIsLoading(true);
    mutateRequestPincode(
      {email},
      {
        onSuccess() {
          setIsLoading(false);
        },
        onError() {
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <View>
      <PincodeForm navigation={navigation} makeRequest={makeLoginRequest} />

      <View style={{marginTop: 30}}>
        <RoundedButton
          isDisabled={false}
          text="Resend pincode"
          pressHandler={resendPincode}
        />
      </View>
      {isLoading && <LoadingSpinner />}
    </View>
  );
};

export default Pincode;
