import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from './src/screens/AuthScreen';
import LoginScreen from './src/screens/LoginScreen';
import {RootStackParamList} from './src/types/route.screen.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{
            title: 'Auth',
            headerShown: false,
            animation: 'fade_from_bottom',
            animationDuration: 180,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login',
            headerShown: false,
            animation: 'fade_from_bottom',
            animationDuration: 180,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
