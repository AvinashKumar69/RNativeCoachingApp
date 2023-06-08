import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';

import {AuthenticationContext} from '../../services/AuthContext';

const Login = () => {
  const {googleSignInHandler} = useContext(AuthenticationContext);
  // const googleSignInHandler = () => {
  //   onGoogleButtonPress()
  //     .then(userDetails => {
  //       // console.log('Signed in with Google!', userDetails);
  //       const u1 = userDetails?.additionalUserInfo?.profile;
  //       const u2 = userDetails?.user;
  //       //
  //       const additionalUserInfo = {
  //         email: u1?.email,
  //         email_verified: u1?.email_verified,
  //         name: u1?.name,
  //         picture: u1?.picture,
  //         uid: u2?.uid,
  //         isAnonymous: u2?.isAnonymous,
  //         displayName: u2?.displayName,
  //       };
  //       addUserToDB(additionalUserInfo, u2?.uid).then(() => {
  //         console.log('user1 added');
  //         //
  //         const userInfo = {
  //           emailVerified: u2?.emailVerified,
  //           phoneNumber: u2?.phoneNumber,
  //           photoURL: u2?.photoURL,
  //           metadata: u2?.metadata,
  //         };
  //         addAdditionalUserInfoToDB(userInfo, u2?.uid).then(() => {
  //           console.log('user2 added');
  //         });
  //       });
  //     })
  //     .catch(error => console.error(error));
  // };

  return (
    <View style={styles.topContainer}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        style={styles.googleSignInButton}
        onPress={googleSignInHandler}
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
