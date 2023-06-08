import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

const Home = () => {
  const navigation = useNavigation();

  const signOutHandler = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.homeContainer}>
      <Button
        icon="arrow-right-circle-outline"
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabelStyle}
        onPress={() => {
          navigation.navigate('Notes');
        }}>
        Notes Screen
      </Button>

      <Button
        icon="logout"
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabelStyle}
        onPress={signOutHandler}>
        Sign Out
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    minHeight: '100%',
    backgroundColor: '#fafafa',
  },
  button: {
    borderRadius: 5,
    marginVertical: '2%',
    backgroundColor: '#273a94',
    width: '50%',
    alignSelf: 'center',
  },
  buttonLabelStyle: {
    color: '#fafafa',
  },
});
