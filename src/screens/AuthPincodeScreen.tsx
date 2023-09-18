import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {AuthPincodeProps} from '../types/route.screen.types';
import Pincode from '../sections/pincode/Pincode';

const AuthPincodeScreen = ({navigation, route}: AuthPincodeProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Please enter pincode that we sent to your email
        </Text>
        <View style={styles.pincodeForm}>
          <Pincode navigation={navigation} email={route.params.email} />
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
    marginTop: 40,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ed7a0e',
  },
  pincodeForm: {
    marginTop: 50,
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

export default AuthPincodeScreen;
