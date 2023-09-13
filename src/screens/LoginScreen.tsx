import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import {LoginProps} from '../types/route.screen.types';
import Login from '../sections/login/Login';

const LoginScreen = ({navigation}: LoginProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Please, login</Text>
        <View style={styles.loginForm}>
          <Login navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loginForm: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ed7a0e',
  },
});

export default LoginScreen;
