/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';

import {RootNavigation} from './src/navigation';
import store from './src/redux/store';
import {AuthenticationContextProvider} from './src/services/AuthContext';

function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#273a94',
      secondary: 'tomato',
    },
  };

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <AuthenticationContextProvider>
          <NavigationContainer>
            <PaperProvider theme={theme}>
              <RootNavigation />
            </PaperProvider>
          </NavigationContainer>
        </AuthenticationContextProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: '#fafafa',
    minHeight: '100%',
  },
});

export default App;
