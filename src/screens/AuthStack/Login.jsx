import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

const Login = () => {
  GoogleSignin.configure({
    webClientId:
      '978978301889-7h8oca0terlmk3iupt5f087ljf68iqjt.apps.googleusercontent.com',
  });

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    // Get the users ID token
    const userInfo = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo?.idToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.topContainer}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        style={styles.googleSignInButton}
        onPress={() =>
          onGoogleButtonPress().then(additionalUserInfo =>
            console.log('Signed in with Google!', additionalUserInfo),
          )
        }
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  topContainer: {
    minHeight: '100%',
    backgroundColor: '#fafafa',
  },
  googleSignInButton: {
    marginVertical: '2%',
    alignSelf: 'center',
  },
});
