import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

type Props = {
  wordLength: number;
  answerWord: string;
};

const WordView = ({wordLength, answerWord}: Props) => {
  return (
    <View style={styles.container}>
      {Array(wordLength)
        .fill(0)
        .map((_, i) => {
          return (
            <View key={i} style={styles.charContainer}>
              <Text style={styles.charText}>{answerWord[i] || '_'}</Text>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  charContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7af5a3',
  },
  charText: {
    fontSize: 20,
  },
});

export default WordView;
