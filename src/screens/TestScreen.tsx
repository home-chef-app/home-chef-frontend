import React from 'react';
import { Text, useColorScheme, StyleSheet, View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import $t from '../i18n';
import { RootState, useAppDispatch } from '../store/store';
import { signOut } from '../store/users/thunks';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { get } from 'services/ApiBaseService';

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

  const testAuthToken = async () => {
    try {
      const result = await get('tokenTest');
      console.log(result);

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <View style={styles.pageContainer}>
        <>
          {!!user && (
            <View key={user.id} style={styles.userContainer}>
              <View style={styles.userInfo}>
                <Text style={styles.labelText}>Id</Text>
                <Text>{user.id}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.labelText}>Phone</Text>
                <Text>{user.phone}</Text>
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
              <PrimaryButton text="Test access token" onPress={() => testAuthToken()} />
              <PrimaryButton text="Sign Out" onPress={() => dispatch(signOut())} />
            </View>
          )}
        </>

      </View>
    </>
  );
};

export default App;
