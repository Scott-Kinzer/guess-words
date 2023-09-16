import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {AuthProps} from '../types/route.screen.types';
import Register from '../sections/register/Register';

const AuthScreen = ({navigation}: AuthProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Guess With Hints</Text>

        <View style={styles.authForm}>
          <Register navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginTop: 80,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ed7a0e',
  },
  authForm: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default AuthScreen;
