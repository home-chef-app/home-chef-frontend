import React, { useState } from 'react';
import { Text, useColorScheme, StyleSheet, View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import $t from '../i18n';
import { RootState, useAppDispatch } from '../store/store';
import { signOut } from '../store/users/thunks';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { get } from 'services/ApiBaseService';
import FullScreenWrapper from './FullScreenWrapper';
import { SellerQueryHits, SellerType } from 'store/sellers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack } from 'services/NavigationService';
import { Button, Column, Icon, IconButton, Image, Row } from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";


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
  const [seller, setSeller] = useState<SellerType>(route.params.seller);
  console.log(seller)
  return (
    <SafeAreaView>
      {/* <Text>
        {seller._source.name}
      </Text>
      <Button onPress={() => goBack()}>
        Back
      </Button> */}
      <Column justifyContent='flex-start' alignItems='flex-start'>
        <View style={{
          width: "100%",
          height: 250,
          position: "relative",
        }}>
          <Image source={require('../assets/images/spagetti.jpg')} alt="seller-cover" style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0
          }} />
          <View style={{
            width: '100%',
            height: 56,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }} />
          <Row
            alignItems="flex-end"
            justifyContent="flex-start"
            style={{
              bottom: 0,
              left: 0,
              position: "absolute",
              padding: 10
            }}>
            <Image
              source={require('../assets/images/chef.jpg')}
              alt="seller-profile"
              style={{
                borderRadius: 10,
                width: 88,
                height: 88,
                padding: 10
              }}
            />
            <Text style={{ fontSize: 22, fontWeight: '500', color: 'white', marginLeft: 10 }}>{seller.name}</Text>
          </Row>
          <Row justifyContent='space-between' alignItems='center' style={{
            position: 'absolute',
            width: '100%',
            margin: 10,
            top: 0,
            left: 0
          }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#3F3F46'
            }}>
              <IconButton onPress={() => goBack()} icon={<Icon as={Ionicons} name="arrow-back-sharp" size={6} color="white" />} />
            </View>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#3F3F46'
            }}>
              <Icon as={AntDesign} name="heart" size={5} color="white" />
            </View>
          </Row>
        </View>
      </Column>
    </SafeAreaView>





  );
};

export default SellerProfile;
