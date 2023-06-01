import firestore, {firebase} from '@react-native-firebase/firestore';

// add a note to db
export const addNoteToDB = note => {
  return firestore()
    .collection('notes')
    .add({
      ...note,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
