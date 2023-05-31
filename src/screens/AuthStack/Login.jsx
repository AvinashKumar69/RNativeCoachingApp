import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

const Login = () => {
  return (
    <View style={styles.topContainer}>
      <Text>Login using email and password</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('login button pressed')}>
        Login
      </Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  topContainer: {
    minHeight: '100%',
    backgroundColor: '#fafafa',
  },
});
