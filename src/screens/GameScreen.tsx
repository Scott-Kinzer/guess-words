import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import WordView from '../components/word-view/WordView';
import CustomKeyboard from '../components/keyboard/CustomKeyboard';

const GameScreen = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const wordLength = 5;
  const isValid = wordLength === userAnswer.length;

  const enterKey = (letter: string) => {
    setUserAnswer(prevWord => {
      if (prevWord.length < wordLength) {
        return prevWord + letter;
      }

      return prevWord;
    });
  };

  const deleteKey = () => {
    if (userAnswer.length > 0) {
      setUserAnswer(userAnswer.slice(0, -1));
    }
  };

  const submit = () => {
    console.log(userAnswer);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Let's play</Text>
      <View style={styles.wordViewWrapper}>
        <WordView wordLength={5} answerWord={userAnswer} />
      </View>
      <View style={styles.hintContainer}>
        <Text style={styles.hintText}>
          Some hint for user to guess word Some hint for user to guess word Some
          hint for user to guess word
        </Text>
      </View>
      <View style={styles.keyboardWrapper}>
        <CustomKeyboard
          submit={submit}
          enterKey={enterKey}
          deleteKey={deleteKey}
          isValid={isValid}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  hintText: {
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  wordViewWrapper: {
    marginTop: 20,
    flex: 2,
  },
  hintContainer: {
    alignSelf: 'center',
    flexWrap: 'wrap',
    width: '100%',
    flex: 2,
    paddingHorizontal: 20,
  },
  keyboardWrapper: {
    marginTop: 20,
    flex: 4,
  },
});

export default GameScreen;
