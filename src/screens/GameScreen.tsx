import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import WordView from '../components/word-view/WordView';
import CustomKeyboard from '../components/keyboard/CustomKeyboard';
import {useQuery} from '@tanstack/react-query';
import {
  WordDetailsResponse,
  wordDetailsRequest,
} from '../services/game.service';
import {GameProps} from '../types/route.screen.types';

const GameScreen = ({route}: GameProps) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [wordDetails, setWordDetails] = useState<
    undefined | WordDetailsResponse
  >();
  const isValid = wordDetails?.wordLength === userAnswer.length;

  console.log(route.params.wordId);

  const {} = useQuery(
    ['wordDetails'],
    () => wordDetailsRequest({wordId: route.params.wordId}),
    {
      onSuccess(data) {
        console.log(data);
        setWordDetails(data);
      },
    },
  );

  const enterKey = (letter: string) => {
    setUserAnswer(prevWord => {
      if (wordDetails && prevWord.length < wordDetails?.wordLength) {
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
      {wordDetails && (
        <>
          <View style={styles.wordViewWrapper}>
            <WordView
              wordLength={wordDetails?.wordLength}
              answerWord={userAnswer}
            />
          </View>
          <View style={styles.hintContainer}>
            <View style={styles.hintinnerContainer}>
              <Text style={styles.hintText}>{wordDetails?.hint.hint}</Text>
            </View>
          </View>
          <View style={styles.keyboardWrapper}>
            <CustomKeyboard
              submit={submit}
              enterKey={enterKey}
              deleteKey={deleteKey}
              isValid={isValid}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ce7af5',
  },
  hintText: {
    width: '100%',
    textAlign: 'center',
    padding: 5,
    borderRadius: 20,
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
    flexWrap: 'wrap',
    width: '100%',
    flex: 2,
    paddingHorizontal: 20,
  },
  hintinnerContainer: {
    flexWrap: 'wrap',
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#f5cc7a',
  },
  keyboardWrapper: {
    marginTop: 20,
    flex: 4,
  },
});

export default GameScreen;
