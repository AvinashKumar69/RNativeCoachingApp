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

function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <RootNavigation />
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
