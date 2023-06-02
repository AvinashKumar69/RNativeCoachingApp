import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Google sign-in
export const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

// add user to db
export const addUserToDB = (user, uid) => {
  return firestore()
    .collection('users')
    .doc(uid)
    .set({
      ...user,
    });
};

// add additional user info to db
export const addAdditionalUserInfoToDB = (user, uid) => {
  return firestore()
    .collection('users')
    .doc(uid)
    .collection('additionalUserDetails')
    .doc('additionalUserDetails')
    .set({
      ...user,
    });
};
