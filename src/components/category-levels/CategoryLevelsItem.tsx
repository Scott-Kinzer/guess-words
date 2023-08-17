import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {
  clickHandler: () => void;
};

const CategoryLevelsItem = ({clickHandler}: Props) => {
  return (
    <TouchableOpacity onPress={clickHandler} style={styles.category}>
      <Text style={{textAlign: 'center'}}>Level 1</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: {
    width: '100%',
    borderWidth: 3,
    borderColor: '#83609c',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#c09ed9',
  },
});

export default CategoryLevelsItem;
