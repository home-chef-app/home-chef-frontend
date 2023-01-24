import React, { useEffect, type PropsWithChildren } from 'react';
import { ScrollView, Text, useColorScheme, StyleSheet, Image, View, ActivityIndicator, Dimensions } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { UserType } from 'store/users';
import $t from '../i18n';
import { RootState, store, useAppDispatch } from '../store/store';
import { fetchActiveUser, signOut } from '../store/users/thunks';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';

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


type TestProps = {}

const App = ({ }: TestProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const color = !isDarkMode ? 'black' : 'white'


  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.users.activeUser);
  const loading = useSelector((state: RootState) => state.appState.loading);
  console.log(user);
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
            {!!user && (
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
                <Text style={{ color: color }}>
                  {$t('helloWorld')}
                </Text>
                <PrimaryButton text="Test" onPress={() => console.log('Pressed')} />
                <SecondaryButton text="Test" onPress={() => console.log('Pressed')} />
                <PrimaryButton text="Sign Out" onPress={() => dispatch(signOut())} />
              </View>
            )}
          </>
        }
      </View>
    </>
  );
};

export default App;
