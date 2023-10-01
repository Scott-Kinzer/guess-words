import React, {Dispatch, SetStateAction, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import LoadingSpinner from '../../components/loader-components/Loader';
import {View} from 'react-native';
import PincodeForm from '../../components/forms/PincodeForm';
import RoundedButton from '../../components/buttons/animated-buttons/RoundedButton';
import {
  forgotPasswordRequest,
  validatePincodeRequest,
} from '../../services/login.service';

type Props = {
  email: string;
  goToNextSection: (pincode: string) => void;
};

const RecoveryPincode = ({email, goToNextSection}: Props) => {
  const {mutate} = useMutation(validatePincodeRequest);
  const {mutate: mutateRequestPincode} = useMutation(forgotPasswordRequest);

  const [isLoading, setIsLoading] = useState(false);

  const validateRecoveryPincodeRequest = (
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
      onSuccess: () => {
        goToNextSection(pincode);
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
      <PincodeForm makeRequest={validateRecoveryPincodeRequest} />

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

export default RecoveryPincode;
