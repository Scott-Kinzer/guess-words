import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {WordListResponse} from '../../services/categories.service';

type Props = {
  wordData: WordListResponse;
  clickHandler: (wordId: string) => void;
};

const CategoryLevelsItem = ({wordData, clickHandler}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => clickHandler(wordData.word_id)}
      style={{
        ...styles.category,
        backgroundColor: wordData.is_guessed ? 'grey' : '#c09ed9',
      }}>
      <Text style={{textAlign: 'center'}}>Level {wordData.level}</Text>
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
