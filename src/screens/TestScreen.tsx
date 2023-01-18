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
import { ScrollView, Text, useColorScheme, StyleSheet, Image, View, ActivityIndicator, Dimensions } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { UserType } from 'redux/users';
import $t from '../i18n';
import { RootState, store, useAppDispatch } from '../redux';
import { fetchActiveUser } from '../redux/users/thunks';

const styles = StyleSheet.create({
  pageContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userContainer: {
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderColor: '#FFD4D444',
    margin: 10,
    padding: 10,
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 12,
    borderWidth: 1
  },
  userInfo: {
    flexDirection: 'row',

  },
  labelText: {
    fontWeight: '700',
    paddingRight: 10
  }
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
          <>
            {users?.map((user: UserType) => (
              <View key={user.id} style={styles.userContainer}>
                <View style={styles.userInfo}>
                  <Text style={styles.labelText}>Id</Text>
                  <Text>{user.id}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.labelText}>Email</Text>
                  <Text>{user.email}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.labelText}>First name</Text>
                  <Text>{user.first_name}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.labelText}>Last name</Text>
                  <Text>{user.last_name}</Text>
                </View>
              </View>
            ))}
          </>
        }
      </View>
    </>
  );
};

export default App;
