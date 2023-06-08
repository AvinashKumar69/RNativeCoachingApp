import {
  ALLCONSUMERCHATMESSAGES,
  ALLCONSUMERCHATMESSAGESBULK,
  CHATLISTADDER,
  CHATRESET,
  CONSUMERCHATSEENUPDATED,
  CONSUMERUPDATEDMESSAGE,
  OTHERUSERSDETAIL,
} from '../action/ChatAction';

const initialState = {
  chatDetail: {},
  allConsumerChatMessages: {},
  chatListOtherUsersDetail: {},
};

const chatReducer = (store = initialState, action) => {
  let chatId,
    messageList,
    ourId,
    otherId,
    data,
    docId,
    latestMessage = {},
    array = [];

  switch (action.type) {
    case ALLCONSUMERCHATMESSAGESBULK:
      [chatId, messageList] = action.payload;
      let initMessages = store.allConsumerChatMessages[chatId];
      initMessages = initMessages === undefined ? [] : initMessages;
      const mL = messageList.map(val => {
        const dat = val.data();
        const obj =
          '_id' in val
            ? {...dat, docId: val.id}
            : {...dat, docId: val.id, _id: val.id}; // gifted-chat needs '_id' key
        return obj;
      });
      return {
        ...store,
        allConsumerChatMessages: {
          ...store.allConsumerChatMessages,
          [chatId]: mL.reduce(
            (o, message) => ({
              ...o,
              [message.docId]: {
                ...message,
                createdAt: !!message?.createdAt?.seconds
                  ? message.createdAt.seconds * 1000
                  : new Date().getTime(),
              },
            }),
            initMessages,
          ),
        },
      };

    case ALLCONSUMERCHATMESSAGES:
      if (store.allConsumerChatMessages[action.payload[0]] === undefined) {
        return {
          ...store,
          allConsumerChatMessages: {
            ...store.allConsumerChatMessages,
            [action.payload[0]]: {
              [action.payload[1]]: action.payload[2],
            },
          },
        };
      } else {
        return {
          ...store,
          allConsumerChatMessages: {
            ...store.allConsumerChatMessages,
            [action.payload[0]]: {
              ...store.allConsumerChatMessages[action.payload[0]],
              [action.payload[1]]: action.payload[2],
            },
          },
        };
      }

    case CHATLISTADDER:
      [chatId, data, ourId, otherId] = action.payload;
      return {
        ...store,
        chatDetail: {
          ...store.chatDetail,
          [otherId]: {
            ...data,
            docId: chatId,
            otherId: otherId,
            ourId: ourId,
          },
        },
      };

    case OTHERUSERSDETAIL:
      // console.log('action.payload-->', action.payload);
      otherId = action.payload.uid;
      data = action.payload;
      return {
        ...store,
        chatListOtherUsersDetail: {
          ...store.chatListOtherUsersDetail,
          [otherId]: {...data},
        },
      };

    case CHATRESET:
      return {
        ...initialState,
      };

    case CONSUMERCHATSEENUPDATED:
      docId = action.payload[0];
      chatId = action.payload[1];
      ourId = action.payload[2];
      array = [];
      if (store.allConsumerChatMessages[chatId][docId].store === undefined) {
        array.push(ourId);
      } else {
        array = store.allConsumerChatMessages[chatId][docId].store.push(ourId);
      }
      return {
        ...store,
        allConsumerChatMessages: {
          ...store.allConsumerChatMessages,
          [chatId]: {
            ...store.allConsumerChatMessages[chatId],
            [docId]: {
              ...store.allConsumerChatMessages[chatId][docId],
              seen: array,
            },
          },
        },
      };

    case CONSUMERUPDATEDMESSAGE:
      [chatId, docId, latestMessage] = action.payload;
      return {
        ...store,
        allConsumerChatMessages: {
          [chatId]: {
            ...store.allConsumerChatMessages[chatId],
            [docId]: latestMessage,
          },
        },
      };

    default:
      return store;
  }
};

export default chatReducer;
