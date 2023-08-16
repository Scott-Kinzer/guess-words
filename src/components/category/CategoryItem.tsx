import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {
  text: string;
  handler: () => void;
};

const CategoryItem = ({text, handler}: Props) => {
  return (
    <TouchableOpacity onPress={handler} style={styles.category}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: {
    width: '48%',
    borderWidth: 3,
    borderColor: '#38d950',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#5eff79',
  },
});

export default CategoryItem;
