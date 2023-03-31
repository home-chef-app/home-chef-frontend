import { getLatitide, getLongitude } from '@src/utils/sellers';
import React, { useEffect, useState } from 'react';
import { useColorScheme, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectAllSellers } from 'store/sellers';
import { RootState } from 'store/store';
import { SellerType } from 'store/sellers';
import MapRestPanel from './MapRestPanel';


const MapScreen = ({ }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const userLoc = useSelector((state: RootState) => state.users.userLoc);
  const sellers = useSelector(selectAllSellers)
  const [selectedSeller, setSelectedSeller] = React.useState<null | SellerType>(null)
  console.log('Selected', selectedSeller)



  return (
    <>
      {!userLoc ? <Text>No User Location Perms</Text> : (
        <View style={styles.pageContainer}>
          <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE} initialRegion={{
            latitude: 44.65137849025714,
            longitude: -63.59011076985939,
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
                onPress={() => setSelectedSeller(seller)}
              />
            ))}
          </MapView>
          {!!selectedSeller ? (
            <MapRestPanel seller={selectedSeller} onClose={() => setSelectedSeller(null)} />
          ) : null}
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