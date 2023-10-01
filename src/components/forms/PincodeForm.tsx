import {Formik} from 'formik';
import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputTextInputEventData,
  View,
} from 'react-native';

import RoundedButton from '../buttons/animated-buttons/RoundedButton';
import {pinCodeValidation} from './validations/auth.validation';
import {isNumber} from '../../helpers/isNumber';
import {PINCODE_OBJ, PINCODE_TEMP} from './form-data/form.data';

type Props = {
  makeRequest: (
    data: {[x: string]: string},
    setErrors: Dispatch<SetStateAction<string>>,
  ) => void;
};

const PincodeForm = ({makeRequest}: Props) => {
  const pincodeRefs = useRef<Array<TextInput | null>>([]);
  const [serverError, setServerError] = useState('');

  return (
    <View>
      <Formik
        initialValues={PINCODE_OBJ}
        validateOnMount
        validationSchema={pinCodeValidation}
        onSubmit={values => {
          makeRequest(values, setServerError);
        }}>
        {({values, isValid, handleSubmit, handleChange}) => (
          <View>
            <View style={styles.container}>
              {PINCODE_TEMP.map((key, i) => {
                const onChangeInputText = (
                  e: NativeSyntheticEvent<TextInputTextInputEventData>,
                ) => {
                  const textPrevious = e.nativeEvent.previousText;
                  const text = e.nativeEvent.text;

                  if (text === '') {
                    setServerError('');
                    textPrevious === '' && i > 0
                      ? pincodeRefs.current[i - 1]?.focus()
                      : handleChange(key)(text);
                  }
                  if (isNumber(text)) {
                    setServerError('');
                    const lastEntered = text[text.length - 1];
                    handleChange(key)(lastEntered);

                    if (i < PINCODE_TEMP.length - 1) {
                      pincodeRefs.current[i + 1]?.focus();
                    }
                  }
                };
                return (
                  <TextInput
                    key={key}
                    ref={ref => (pincodeRefs.current[i] = ref)}
                    style={styles.input}
                    value={values[key]}
                    onTextInput={onChangeInputText}
                    keyboardType="number-pad"
                  />
                );
              })}
            </View>
            {serverError && (
              <View style={{paddingLeft: 20, paddingTop: 10}}>
                <Text>{serverError}</Text>
              </View>
            )}

            <View style={{marginTop: 30}}>
              <RoundedButton
                isDisabled={!isValid}
                text="Submit pincode"
                pressHandler={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  input: {
    width: 50,
    height: 50,
    fontSize: 24,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default PincodeForm;
