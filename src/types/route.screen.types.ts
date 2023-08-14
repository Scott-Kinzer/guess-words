import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Auth: undefined;
  AuthPincode: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type AuthProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;
export type AuthPincodeProps = NativeStackScreenProps<
  RootStackParamList,
  'AuthPincode'
>;
