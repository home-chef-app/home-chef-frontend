/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, type PropsWithChildren } from 'react';
import { ScrollView, Text, useColorScheme } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import $t from '../i18n';
import { RootState, store, useAppDispatch } from '../redux';
import { fetchActiveUser } from '../redux/users/thunks';

type TestProps = {
  fontColor: string;
};
const App = ({ fontColor }: TestProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.users.activeUser);
  console.log(user);
  useEffect(() => {
    dispatch(fetchActiveUser());
  }, []);

  return (
    <>
      {!!user && (
        <Text style={{ color: fontColor }}>
          Loaded from state: {user?.first_name}
        </Text>
      )}
      <Text style={{ color: fontColor }}>
        {$t('helloWorld')}
      </Text>
    </>
  );
};

export default App;
