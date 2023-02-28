import React, { useEffect, useState } from 'react';
import { useColorScheme, StyleSheet, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';


const MapScreen = ({ }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const userLoc = useSelector((state: RootState) => state.users.userLoc);
  return (
    <>
      {!userLoc ? <Text>No User Location Perms</Text> : (
        <View style={styles.pageContainer}>
          <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE} initialRegion={{
            latitude: userLoc?.lat,
            longitude: userLoc.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} />
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