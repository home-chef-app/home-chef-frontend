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
import { ScrollView, Text, useColorScheme, StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { UserType } from 'redux/users';
import $t from '../i18n';
import { RootState, store, useAppDispatch } from '../redux';
import { fetchActiveUser } from '../redux/users/thunks';

const styles = StyleSheet.create({
  pageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '000000',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  userContainer: {
    backgroundColor: 'ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
})

type TestProps = {
  fontColor: string;
};
const App = ({ fontColor }: TestProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.users.activeUsers);
  const loading = useSelector((state: RootState) => state.appState.loading);
  console.log(users);
  useEffect(() => {
    dispatch(fetchActiveUser());
  }, []);

  return (
    <>
      <View style={styles.pageContainer}>
        {loading ?
          <ActivityIndicator />
          :
          <View style={styles.userContainer}>
            {users!.map((user: UserType) => (
              <Text key={user.id}>{user.first_name}</Text>
            ))}
          </View>
        }
      </View>
    </>
  );
};

export default App;
