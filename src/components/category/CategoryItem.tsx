import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  text: string;
};

const CategoryItem = ({text}: Props) => {
  return (
    <View style={styles.category}>
      <Text>{text}</Text>
    </View>
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
