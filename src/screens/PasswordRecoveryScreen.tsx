/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import {PasswordRecoveryProps} from '../types/route.screen.types';

enum PasswordRecoverySteps {
  EMAIL,
  PINCODE,
  PASSWORD,
}

const RECOVERY_STEPS = [
  PasswordRecoverySteps.EMAIL,
  PasswordRecoverySteps.PINCODE,
  PasswordRecoverySteps.PASSWORD,
];

const PasswordRecoveryScreen = ({}: PasswordRecoveryProps) => {
  const [currentStep, setCurrentStep] = useState(RECOVERY_STEPS[0]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Password recovery</Text>
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

export default PasswordRecoveryScreen;
