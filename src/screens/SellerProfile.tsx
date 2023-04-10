import React, { useState } from 'react';
import { Text, useColorScheme, StyleSheet, View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import $t from '../i18n';
import { RootState, useAppDispatch } from '../store/store';
import { signOut } from '../store/users/thunks';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { get } from 'services/apiBaseService';
import FullScreenWrapper from './FullScreenWrapper';
import { SellerQueryHits, SellerType } from 'store/sellers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack } from 'services/NavigationService';
import { Button } from 'native-base';


const styles = StyleSheet.create({
  pageContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userContainer: {
    flex: 1,
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



const SellerProfile = ({ navigation, route }: any) => {
  const [seller, setSeller] = useState<SellerQueryHits>(route.params.seller);
  console.log(seller)
  return (
    <SafeAreaView>
      <Text>
        {seller._source.name}
      </Text>
      <Button onPress={() => goBack()}>
        Back
      </Button>
    </SafeAreaView>





  );
};

export default SellerProfile;
