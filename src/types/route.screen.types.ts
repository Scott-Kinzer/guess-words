import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Auth: undefined;
  PasswordRecovery: undefined;
  AuthPincode: {
    email: string;
  };
  Category: undefined;
  CategoryLevels: {
    categoryType: string;
  };
  Game: {
    wordId: string;
  };
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type AuthProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;
export type PasswordRecoveryProps = NativeStackScreenProps<
  RootStackParamList,
  'PasswordRecovery'
>;
export type AuthPincodeProps = NativeStackScreenProps<
  RootStackParamList,
  'AuthPincode'
>;
export type CategoryProps = NativeStackScreenProps<
  RootStackParamList,
  'Category'
>;

export type CategoryLevelsProps = NativeStackScreenProps<
  RootStackParamList,
  'CategoryLevels'
>;

export type GameProps = NativeStackScreenProps<RootStackParamList, 'Game'>;
