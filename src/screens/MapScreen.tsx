import { getLatitide, getLongitude } from '@src/utils/sellers';
import React, { useEffect, useState } from 'react';
import { useColorScheme, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectAllSellers } from 'store/sellers';
import { RootState } from 'store/store';


const MapScreen = ({ }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const userLoc = useSelector((state: RootState) => state.users.userLoc);
  const sellers = useSelector(selectAllSellers)

  return (
    <>
      {!userLoc ? <Text>No User Location Perms</Text> : (
        <View style={styles.pageContainer}>
          <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE} initialRegion={{
            latitude: userLoc?.lat,
            longitude: userLoc.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} >
            {sellers.map((seller) => (
              <Marker
                key={seller.id}
                title={seller.name}
                pinColor={"red"}
                coordinate={{
                  longitude: getLongitude(seller),
                  latitude: getLatitide(seller)
                }}
                onPress={() => console.log(seller)}
              />
            ))}
          </MapView>
        </View>
      )}

    </>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },

})