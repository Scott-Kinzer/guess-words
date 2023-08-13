import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {
  bgColor?: string;
  text: string;
  pressHandler: (e: any) => void;
};

const RoundedButton = ({text, bgColor = '#752894', pressHandler}: Props) => {
  return (
    <TouchableOpacity
      onPress={pressHandler}
      style={{...styles.buttonContainer, backgroundColor: bgColor}}>
      <Text style={{color: 'white'}}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    borderColor: '#ddd',
  },
});

export default RoundedButton;
