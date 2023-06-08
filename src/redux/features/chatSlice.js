import {createSlice} from '@reduxjs/toolkit';

export const allChatDetailsSlice = createSlice({
  name: 'allChatDetails',
  initialState: {
    chatDetail: {},
    allConsumerChatMessages: {},
  },
  reducers: {
    chatListAdder: (state, action) => {
      [chatId, data, ourId, otherId] = action.payload;
      state.chatDetail = {
        ...state.chatDetail,
        [otherId]: {...data, docId: chatId, otherId: otherId, ourId: ourId},
      };
    },

    // export const singleChatMessages = payload => dispatch => {
    //     const [chatId, isUserChat, newLastSent, lastSent, ourId] = payload;
      
    //     let minLastSent = null;
    //     if (!!lastSent) {
    //       if (lastSent?.seconds * 1000 >= newLastSent?.seconds * 1000) {
    //         minLastSent = newLastSent?.seconds * 1000;
    //       } else {
    //         minLastSent = lastSent?.seconds * 1000;
    //       }
    //     }
      
    //     getNewMessagesForChat(chatId, minLastSent)
    //       .then(messages => {
    //         if (!messages.empty) {
    //           if (minLastSent !== null && messages.docs[0].data().sentBy !== ourId) {
    //             const messageId = messages.docs[0].id;
    //             firebase
    //               .firestore()
    //               .collection('allChats')
    //               .doc(chatId)
    //               .collection('message')
    //               .doc(messageId)
    //               .update({
    //                 ...messages.docs[0].data(),
    //                 deliveredTo: firestore.FieldValue.arrayUnion(ourId),
    //               })
    //               .catch(error => {
    //                 console.error(`update ${error}`);
    //               });
    //           }
    //           dispatch(allConsumerChatMessagesBulk([chatId, messages.docs]));
    //         }
    //       })
    //       .catch(err => {
    //         console.error('Error in getting messages', err);
    //       });
    //   };
  },
});

// Action creators are generated for each case reducer function
export const {chatListAdder} = allChatDetailsSlice.actions;

export default allChatDetailsSlice.reducer;
