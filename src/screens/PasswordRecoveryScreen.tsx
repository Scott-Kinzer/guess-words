/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import {PasswordRecoveryProps} from '../types/route.screen.types';
import RecoveryEmail from '../sections/recovery/RecoveryEmail';

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

        <View style={styles.forms}>
          {currentStep === PasswordRecoverySteps.EMAIL && (
            <RecoveryEmail
              goToNextSection={(email: string) => console.log(email)}
            />
          )}
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
  forms: {
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
