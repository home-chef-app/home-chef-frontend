import { getLatitide, getLongitude } from '@src/utils/sellers';
import React, { useEffect, useState } from 'react';
import { useColorScheme, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectAllSellers } from 'store/sellers';
import { RootState } from 'store/store';
import { SellerType } from 'store/sellers';
import MapRestPanel from './MapRestPanel';
import SearchComponent from 'components/SearchAlgolia/SearchComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  connectRefinementList,
} from 'react-instantsearch-native';
import SearchBox from '../components/SearchAlgolia/SearchBox';
import InfiniteHits from 'components/SearchAlgolia/InfiniteHits';
import Filters from 'components/SearchAlgolia/Filters';
import { SafeAreaView } from 'react-native';



const MapScreen = ({ }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const userLoc = useSelector((state: RootState) => state.users.userLoc);
  const sellers = useSelector(selectAllSellers)
  const [selectedSeller, setSelectedSeller] = React.useState<null | SellerType>(null)
  console.log('Selected', selectedSeller)
  console.log('sellers', sellers)
  console.log(insets)
  const [focused, setFocused] = useState(false)
  const [filterModal, setFilterModal] = useState(false)
  const [searchState, setSearchState] = useState({})
  console.log('Focused')


  const searchClient = algoliasearch(
    'WHP2PDCPD1',
    '6dc67bcedb99f3b339d1bb83f7a20d50'
  );
  const onSearchStateChange = (searchState: any) => {
    setSearchState(searchState)
  }



  return (
    <>
      {!userLoc ? <Text>No User Location Perms</Text> : (
        <View style={styles.pageContainer}>
          <InstantSearch
            searchClient={searchClient}
            indexName="dev_sellers"
            //@ts-ignore
            root={this.root}
            searchState={searchState}
            onSearchStateChange={onSearchStateChange}
          >
            <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE} initialRegion={{
              latitude: userLoc?.lat,
              longitude: userLoc.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,

            }} onMapReady={() => console.log("Map Ready")} >

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
            <SafeAreaView style={{ position: 'absolute', width: "100%", height: !focused ? 90 : '100%', marginTop: insets.top, backgroundColor: focused ? 'white' : 'transparent' }}>
              {/*@ts-ignore*/}
              <SearchBox onFilter={() => setFilterModal(true)} onFocus={() => { console.log("test"); setFocused(true) }} onBlur={() => { console.log("blur"); setFocused(false) }} />
              {focused && (
                <>
                  <InfiniteHits />

                </>
              )}
              {filterModal && (
                <>
                  <Filters
                    isModalOpen={filterModal}
                    searchClient={searchClient}
                    searchState={searchState}
                    toggleModal={() => setFilterModal(!filterModal)}
                    onSearchStateChange={onSearchStateChange}
                  />
                </>
              )}
            </SafeAreaView>
            {
              !!selectedSeller ? (
                <MapRestPanel seller={selectedSeller} onClose={() => setSelectedSeller(null)} />
              ) : null
            }
          </InstantSearch>
        </View >
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