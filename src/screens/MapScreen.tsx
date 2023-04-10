import { getLatitide, getLongitude } from '@src/utils/sellers';
import React, { useEffect, useState } from 'react';
import { useColorScheme, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectAllSellers, SellerQueryHits } from 'store/sellers';
import { RootState } from 'store/store';
import { SellerType } from 'store/sellers';
import MapRestPanel from './MapRestPanel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FullScreenWrapper from './FullScreenWrapper';
import SearchBoxTest from 'components/SearchEs/SearchBox';
import InfiniteHits from 'components/SearchEs/InfiniteHits';
import Filters from 'components/SearchEs/Filters';



const MapScreen = ({ }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const [mapReady, setMapReady] = React.useState(true)
  const [hits, setHits] = React.useState<SellerQueryHits[]>([])
  const userLoc = useSelector((state: RootState) => state.users.userLoc);
  const sellers = useSelector(selectAllSellers)
  const [selectedSeller, setSelectedSeller] = React.useState<null | SellerType>(null)

  const [focused, setFocused] = useState(false)
  const [filterModal, setFilterModal] = useState(false)
  const [searchState, setSearchState] = useState({})


  return (
    <FullScreenWrapper>
      {!userLoc ? <Text>No User Location Perms</Text> : (
        <View style={styles.pageContainer}>

          <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE} initialRegion={{
            latitude: 44.65137849025714,
            longitude: -63.59011076985939,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,

          }} onMapReady={() => setMapReady(true)} >
            {mapReady && (
              <>
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
              </>
            )}

          </MapView>
          <View style={{ position: 'absolute', height: !focused ? 70 : '100%', width: '100%', backgroundColor: !focused ? 'transparent' : 'white' }}>
            <SearchBoxTest onFilter={() => setFilterModal(true)}
              onFocus={() => { console.log("test"); setFocused(true) }}
              onBlur={() => { console.log("blur"); setFocused(false); }}
              onChange={(hits: SellerQueryHits[]) => setHits(hits)} />
            {focused && (
              <>
                <InfiniteHits hits={hits} />

              </>
            )}
            {filterModal && (
              <>
                <Filters
                  isModalOpen={filterModal}
                  searchState={searchState}
                  toggleModal={() => setFilterModal(!filterModal)}
                  onSearchStateChange={(e) => console.log("Test", e)}
                />
              </>
            )}
          </View>

          {
            !!selectedSeller ? (
              <MapRestPanel seller={selectedSeller} onClose={() => setSelectedSeller(null)} />
            ) : null
          }
        </View >
      )}

    </FullScreenWrapper>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },

})