import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CategoryLevelsItem = () => {
  return (
    <View style={styles.category}>
      <Text style={{textAlign: 'center'}}>Level 1</Text>
    </View>
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
