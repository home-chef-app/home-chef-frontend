import React from 'react';
import { useColorScheme, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const MapScreen = ({ }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <View style={styles.pageContainer}>
        <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE} />
      </View>
    </>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },

})