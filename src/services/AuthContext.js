import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {createContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {chatListener} from '../queries/chatQuery';
import {
  addAdditionalUserInfoToDB,
  addUserToDB,
  onGoogleButtonPress,
} from '../queries/loginQuery';
import {
  getChatListOtherUsersDetailsFromDB,
  getUser,
} from '../queries/userQuery';
import {
  chatListAdder,
  chatListOtherUsersDetail,
  singleChatMessages,
} from '../redux/action/ChatAction';
import {allOtherUsers} from '../redux/features/userSlice';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
  GoogleSignin.configure({
    webClientId:
      '978978301889-7h8oca0terlmk3iupt5f087ljf68iqjt.apps.googleusercontent.com',
  });

  const dispatch = useDispatch();
  const reduxStore = useSelector(state => state);
  // console.log('reduxStore==>', reduxStore.allChatDetail.chatDetail);
  // const testArray = reduxStore?.users?.allOtherUsers?.map(item => {
  //   console.log('item==>', item);
  // });

  const subscriptions = [];

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null); // logged-in user details

  //
  const postLogin = uid => {
    // console.log('uid==>', uid);
    // ***
    const chatHandler = (ourId, queryChanges, isUserChat) => {
      const storeState = reduxStore; // to get all the redux-store states
      queryChanges.forEach(({doc}) => {
        const chatId = doc.id;
        const data = doc.data();
        const arr = data.parties;
        const otherId = arr.filter(id => id !== ourId)[0];
        const lastSent =
          isUserChat && storeState.allChatDetail?.chatDetail[otherId]?.lastSent;
        dispatch(chatListAdder([chatId, data, ourId, otherId])); // add complete chat list to redux

        dispatch(chatListOtherUsersDetail(otherId)); // get other user's details

        dispatch(
          // particular message add for a particualr chat
          singleChatMessages([
            chatId,
            isUserChat,
            data.lastSent, // newLastSent,
            lastSent,
            ourId,
          ]),
        );
      });

      // getChatListOtherUsersDetailsFromDB(
      //   Object.keys(storeState?.allChatDetail?.chatDetail),
      // )
      //   .then(querySnapshot => {
      //     if (querySnapshot) {
      //       querySnapshot.docChanges()?.forEach(doc => {
      //         // console.log('doc.data()==>', doc.doc.data());
      //         dispatch(allOtherUsers(doc.doc.data()));
      //       });
      //     }
      //   })
      //   .catch(error =>
      //     console.error('Error in getting other users details:-', error),
      //   );
    };

    // Running for Consumer Chat
    subscriptions.push(chatListener(uid, chatHandler, true));
  };

  // const otherUserIdArray = Object.keys(reduxStore?.allChatDetail?.chatDetail);
  //   console.log('otherUserIdArray==>',otherUserIdArray)

  //  if (otherUserIdArray?.length!==0){
  //   getChatListOtherUsersDetailsFromDB(
  //     Object.keys(reduxStore?.allChatDetail?.chatDetail),
  //   )
  //     .then(querySnapshot => {
  //       if (querySnapshot) {
  //         querySnapshot.docChanges()?.forEach(doc => {
  //            // console.log('doc.data()==>', doc.doc.data());
  //           dispatch(allOtherUsers(doc.doc.data()));
  //         });
  //       }
  //     })
  //     .catch(error =>
  //       console.error('Error in getting other users details:-', error),
  //     );
  //  }
  //

  const onLogin = user => {
    postLogin(user?.uid);
  };

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (user) {
      onLogin(user);
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  // ***

  // * google sign in
  const googleSignInHandler = () => {
    onGoogleButtonPress()
      .then(userDetails => {
        if (userDetails) {
          const uid = userDetails?.user?.uid;
          getUser(uid).then(firestoreDoc => {
            if (!firestoreDoc.exists) {
              const u1 = userDetails?.additionalUserInfo?.profile;
              const u2 = userDetails?.user;
              //
              const additionalUserInfo = {
                email: u1?.email,
                email_verified: u1?.email_verified,
                name: u1?.name,
                picture: u1?.picture,
                uid: u2?.uid,
                isAnonymous: u2?.isAnonymous,
                displayName: u2?.displayName,
              };
              addUserToDB(additionalUserInfo, u2?.uid).then(() => {
                console.log('user1 added');
                //
                const userInfo = {
                  emailVerified: u2?.emailVerified,
                  phoneNumber: u2?.phoneNumber,
                  photoURL: u2?.photoURL,
                  metadata: u2?.metadata,
                };
                addAdditionalUserInfoToDB(userInfo, u2?.uid).then(() => {
                  console.log('user2 added');
                });
              });
            }
          });
          onLogin(userDetails?.user);
        }
      })
      .catch(error => console.error('Error:-', error));
  };
  // ***

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        googleSignInHandler,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
