/* eslint-disable react/react-in-jsx-scope */
import {createContext, useCallback, useLayoutEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {axiosClient} from '../axios';

interface AuthContextType {
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => Promise<void>;
  accessToken: string;
  isTokenChecking: boolean;
}

const ACCESS_TOKEN_TIME_MS = 36000000;

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const AuthWrapper = ({children}: Props) => {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [accessTokenCreated, setAccessTokenCreated] = useState<Date>();
  const [isTokenChecking, setIsTokenChecking] = useState(true);

  const setTokens = useCallback(
    async (accessTokenValue: string, refreshTokenValue: string) => {
      axiosClient.defaults.headers.common.authorization = accessTokenValue;

      setAccessToken(accessTokenValue);
      setRefreshToken(refreshTokenValue);
      setAccessTokenCreated(new Date());

      try {
        await EncryptedStorage.setItem(
          'tokens',
          JSON.stringify({
            accessToken: accessTokenValue,
            refreshToken: refreshTokenValue,
            accessTokenCreated: new Date(),
          }),
        );
      } catch (error) {
        console.log(error);
      }

      setIsTokenChecking(false);
    },
    [],
  );

  const clearTokens = useCallback(async () => {
    await EncryptedStorage.removeItem('tokens');

    setRefreshToken('');
    setAccessToken('');
    setAccessTokenCreated(undefined);
    axiosClient.defaults.headers.common.authorization = '';
  }, []);

  useLayoutEffect(() => {
    let timeOut: NodeJS.Timeout | undefined;
    if (accessToken && refreshToken && accessTokenCreated) {
      const refreshAfter =
        new Date(accessTokenCreated).getTime() +
        ACCESS_TOKEN_TIME_MS -
        new Date().getTime();

      if (refreshAfter >= 0) {
        console.log(refreshAfter);

        timeOut = setTimeout(async () => {
          console.log('UPDATE TOKENS');
          try {
            const response = await axiosClient.post('auth/refresh', {
              accessToken,
              refreshToken,
            });

            const newTokens = response.data as {
              refreshToken: string;
              accessToken: string;
            };

            await EncryptedStorage.removeItem('tokens');

            await EncryptedStorage.setItem(
              'tokens',
              JSON.stringify({
                accessToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken,
                accessTokenCreated: new Date(),
              }),
            );

            axiosClient.defaults.headers.common.authorization =
              newTokens.accessToken;

            setAccessToken(newTokens.accessToken);
            setRefreshToken(newTokens.refreshToken);
            setAccessTokenCreated(new Date());
            setIsTokenChecking(false);
          } catch (error) {}
        }, refreshAfter);
      }
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [accessToken, accessTokenCreated, refreshToken]);

  useLayoutEffect(() => {
    async function retrieveUserTokens() {
      const tokens = await EncryptedStorage.getItem('tokens');

      if (tokens) {
        const tokensObject = JSON.parse(tokens) as unknown as {
          accessTokenCreated: Date;
          accessToken: string;
          refreshToken: string;
        };

        const currentTokenCreated = new Date(tokensObject.accessTokenCreated);

        const isValidTime =
          currentTokenCreated.getTime() +
            ACCESS_TOKEN_TIME_MS -
            new Date().getTime() >
          0;

        console.log(isValidTime);

        if (isValidTime) {
          axiosClient.defaults.headers.common.authorization =
            tokensObject.accessToken;

          setAccessToken(tokensObject.accessToken);
          setRefreshToken(tokensObject.refreshToken);
          setAccessTokenCreated(tokensObject.accessTokenCreated);
          setIsTokenChecking(false);
        } else {
          try {
            const response = await axiosClient.post('auth/refresh', {
              accessToken: tokensObject.accessToken,
              refreshToken: tokensObject.refreshToken,
            });

            const newTokens = response.data as {
              refreshToken: string;
              accessToken: string;
            };

            console.log('REFRESH');

            await EncryptedStorage.removeItem('tokens');

            await EncryptedStorage.setItem(
              'tokens',
              JSON.stringify({
                accessToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken,
                accessTokenCreated: new Date(),
              }),
            );

            axiosClient.defaults.headers.common.authorization =
              newTokens.accessToken;

            setAccessToken(newTokens.accessToken);
            setRefreshToken(newTokens.refreshToken);
            setAccessTokenCreated(new Date());
            setIsTokenChecking(false);
          } catch {
            setIsTokenChecking(false);

            axiosClient.defaults.headers.common.authorization = '';
          }
        }
      } else {
        setIsTokenChecking(false);

        axiosClient.defaults.headers.common.authorization = '';
      }
    }

    retrieveUserTokens();
  }, []);

  return (
    <AuthContext.Provider
      value={{setTokens, clearTokens, accessToken, isTokenChecking}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
