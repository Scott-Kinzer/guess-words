import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

type Props = {
  submit: () => void;
  enterKey: (letter: string) => void;
  deleteKey: () => void;
  isValid: boolean;
};

const CustomKeyboard = ({submit, enterKey, deleteKey, isValid}: Props) => {
  const handleKeyPress = (key: string) => {
    if (key === 'delete') {
      deleteKey();
    } else if (key === 'submit') {
      submit();
    } else {
      enterKey(key);
    }
  };

  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ['delete', 'submit'],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.keyboard}>
        {keyboardLayout.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((key, keyIndex) => (
              <TouchableOpacity
                key={keyIndex}
                style={{
                  ...styles.key,
                  backgroundColor:
                    key === 'submit'
                      ? isValid
                        ? '#cfeb88'
                        : '#e2e3de'
                      : '#cfeb88',
                  width:
                    key === 'delete' || key === 'submit'
                      ? Dimensions.get('window').width / 3 - 10
                      : Dimensions.get('window').width / 10 - 10,
                }}
                disabled={key === 'submit' && !isValid}
                onPress={() => handleKeyPress(key)}>
                <Text style={styles.keyText}>
                  {key === 'submit' ? 'SUBMIT' : key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  keyboard: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  key: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#cfeb88',
    margin: 5,
  },
  keyText: {
    fontSize: 16,
  },
});

export default CustomKeyboard;
