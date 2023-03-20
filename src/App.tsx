import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  ScrollView,
  View,
} from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import TestScreen from './screens/TestScreen';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NativeBaseProvider } from "native-base";
import { theme } from './theme/nativeBaseTheme'
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider style={backgroundStyle} >
          <GestureHandlerRootView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <AppNavigator />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
