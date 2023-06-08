import {firebase} from '@react-native-firebase/firestore';

export const getUser = id => {
  return firebase.firestore().collection('users').doc(id).get();
};

export const getUserDetail = id => {
  return firebase
    .firestore()
    .collection('users')
    .doc(id)
    .collection('UserDetails')
    .doc('userDetails')
    .get();
};
