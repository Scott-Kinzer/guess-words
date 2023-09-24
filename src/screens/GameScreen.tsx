import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import WordView from '../components/word-view/WordView';
import CustomKeyboard from '../components/keyboard/CustomKeyboard';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  WordDetailsResponse,
  WordGuessRequest,
  WordHintRequest,
  wordDetailsRequest,
  wordGuessRequest,
  wordhintRequest,
} from '../services/game.service';
import {GameProps} from '../types/route.screen.types';
import {AxiosError} from 'axios';

const GameScreen = ({route}: GameProps) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [wordDetails, setWordDetails] = useState<
    undefined | WordDetailsResponse
  >();
  const isValid = wordDetails?.wordLength === userAnswer.length;
  const hintstLeft = wordDetails
    ? wordDetails?.maxLevelHint - wordDetails?.hint.levelHint
    : 0;

  const [isAttemptsEnded, setIsAttemptsEnded] = useState(false);

  useQuery(
    ['wordDetails'],
    () => wordDetailsRequest({wordId: route.params.wordId}),
    {
      onSuccess(data) {
        setWordDetails(data);
      },
    },
  );

  const {mutate: mutateHint} = useMutation(
    (data: WordHintRequest) => wordhintRequest(data),
    {
      onSuccess(data) {
        setWordDetails(prev => {
          if (prev) {
            return {
              ...prev,
              hint: {
                ...data,
              },
            };
          }
        });
      },
    },
  );

  const {mutate} = useMutation(
    (data: WordGuessRequest) => wordGuessRequest(data),
    {
      onSuccess() {
        console.log('you guessed');
      },
      onError(error) {
        const errorAxios = (error as AxiosError).response?.data as {
          message: string;
        };

        if (
          errorAxios?.message === 'Wrong word' &&
          wordDetails &&
          wordDetails?.hint.levelHint < wordDetails?.maxLevelHint
        ) {
          mutateHint({
            wordId: wordDetails.id,
            level: wordDetails.hint.levelHint + 1,
          });
        } else if (
          errorAxios?.message === 'Wrong word' &&
          wordDetails &&
          wordDetails?.hint.levelHint === wordDetails?.maxLevelHint
        ) {
          setIsAttemptsEnded(true);
          console.log('you loose');
        }
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
    if (wordDetails && !isAttemptsEnded) {
      mutate({
        word: userAnswer.toLowerCase(),
        wordId: wordDetails?.id,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Let's play</Text>
      <Text style={styles.title}>Hints left {hintstLeft}</Text>

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
