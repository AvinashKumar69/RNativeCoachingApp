/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {RootNavigation} from './src/navigation';
import store from './src/redux/store';
import { Provider as ReduxProvider} from 'react-redux';

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
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <ReduxProvider store={store}>
          <RootNavigation />
        </ReduxProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: '#fafafa',
    minHeight: '100%',
  },
});

export default App;
