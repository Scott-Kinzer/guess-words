import {Formik, FormikErrors} from 'formik';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {Text, View} from 'react-native';
import * as yup from 'yup';
import StandardInput from '../../components/inputs/StandardInput';
import RoundedButton from '../../components/buttons/animated-buttons/RoundedButton';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {forgotPasswordRequest} from '../../services/login.service';

type Fields = {
  email: string;
};

type Props = {
  goToNextSection: (email: string) => void;
};

const RecoveryEmail = ({goToNextSection}: Props) => {
  const [serverError, setServerError] = useState('');
  const {mutate} = useMutation(forgotPasswordRequest);

  const pincodeRequest = (
    data: Fields,
    setErrors: Dispatch<SetStateAction<string>>,
    setFieldErrors: (errors: FormikErrors<Fields>) => void,
  ) => {
    mutate(data, {
      onSuccess: () => {
        goToNextSection(data.email);
      },
      onError: error => {
        const errorAxios = error as AxiosError;
        if (errorAxios.response?.data) {
          const errorMessage = (errorAxios.response?.data as {message: string})
            ?.message;

          if (errorMessage.startsWith('"email"')) {
            setFieldErrors({email: 'Not valid email'});
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
      <Formik
        initialValues={{email: ''}}
        validationSchema={yup.object({
          email: yup
            .string()
            .email('Invalid email format.')
            .required('Email is required.'),
        })}
        onSubmit={(values, {setErrors}) => {
          pincodeRequest(values, setServerError, setErrors);
        }}>
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
              onChangeText={e => {
                setServerError('');
                return handleChange('email')(e);
              }}
              onBlur={handleBlur('email')}
              setFieldsTouched={setFieldTouched}
            />

            {serverError && (
              <View>
                <Text>{serverError}</Text>
              </View>
            )}

            <View style={{marginTop: 20}}>
              <RoundedButton
                bgColor={Object.keys(errors).length === 0 ? '#ed7a0e' : 'grey'}
                text="Send refresh pincode"
                pressHandler={e => {
                  if (Object.keys(errors).length === 0) {
                    handleSubmit(e);
                  }
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RecoveryEmail;
