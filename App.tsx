import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from './src/screens/AuthScreen';
import LoginScreen from './src/screens/LoginScreen';
import {RootStackParamList} from './src/types/route.screen.types';
import AuthPincodeScreen from './src/screens/AuthPincodeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import CategoryLevelsScreen from './src/screens/CategoryLevelsScreen';
import GameScreen from './src/screens/GameScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AuthWrapper, {AuthContext} from './src/contexts/AuthContext';
import {Text, View} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

const NavigationWrapper = () => {
  const authData = useContext(AuthContext);

  if (authData?.isTokenChecking) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {!authData?.accessToken ? (
        <>
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
            name="AuthPincode"
            component={AuthPincodeScreen}
            options={{
              title: 'Enter pincode',
              headerShown: false,
              animation: 'fade_from_bottom',
              animationDuration: 180,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Category"
            component={CategoryScreen}
            options={{
              title: 'Category',
              headerShown: false,
              animation: 'fade_from_bottom',
              animationDuration: 180,
            }}
          />
          <Stack.Screen
            name="CategoryLevels"
            component={CategoryLevelsScreen}
            options={{
              title: '',
              animation: 'flip',
              animationDuration: 180,
              headerTransparent: true,
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{
              title: '',
              animation: 'flip',
              animationDuration: 180,
              headerTransparent: true,
              headerBackTitleVisible: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>
          <NavigationWrapper />
        </AuthWrapper>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
