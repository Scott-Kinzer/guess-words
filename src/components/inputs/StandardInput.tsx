import React, {ChangeEvent, useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

type Props = {
  placeholder: string;
  error?: string;
  value: string;
  name: string;
  isTouched: boolean;
  onChangeText: (e: string | ChangeEvent<any>) => void;
  onBlur: (e: string | ChangeEvent<any>) => void;
  setFieldsTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => Promise<any>;
};

const StandardInput = ({
  placeholder,
  error,
  name,
  value,
  isTouched,
  onChangeText,
  setFieldsTouched,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setFieldsTouched(name, true, true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setFieldsTouched(name, true, true);
  };

  return (
    <View
      style={[
        styles.inputContainer,
        isFocused && styles.focusedContainer,
        !!error && isTouched && styles.errorContainer,
      ]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        value={value}
        keyboardType="default"
      />
      {!!error && isTouched && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  focusedContainer: {
    borderColor: '#007AFF',
    borderWidth: 1,
    shadowOpacity: 0.4,
  },
  errorContainer: {
    borderColor: '#FF3B30',
    borderWidth: 1,
    shadowOpacity: 0.4,
  },
  input: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    color: '#333333',
  },
  errorText: {
    paddingLeft: 12,
    position: 'relative',
    top: -5,
    fontSize: 14,
    color: '#FF3B30',
    marginTop: 6,
  },
});

export default StandardInput;
