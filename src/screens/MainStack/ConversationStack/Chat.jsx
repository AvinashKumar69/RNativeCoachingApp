import firestore, {firebase} from '@react-native-firebase/firestore';
import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import {AuthenticationContext} from '../../../services/AuthContext';

const Chat = ({route, navigation}) => {
  const {otherId, ourId, docId} = route.params;
  console.log('params @ chat-->', route.params);

  const {user} = useContext(AuthenticationContext);
  let allMessages = {};
  allMessages = useSelector(
    state => state.allChatDetail.allConsumerChatMessages,
  );

  const [chatId, setChatId] = useState(docId);
  console.log('chatid==>', chatId);
  const [customText, setCustomText] = useState('');

  const onChangeInputText = text => {
    setCustomText(text);
  };

  let message = [];
  if (chatId !== undefined && chatId !== null && !!allMessages[chatId]) {
    message = Object.values(allMessages[chatId]).sort((a, b) => {
      return b?.createdAt - a?.createdAt; // here createdAt is coming in seconds
    });
  }

  const msgHandler = async mymsg => {
    const chatRef = firebase.firestore().collection('allChats');
    // create new chat
    if (chatId === undefined) {
      return await chatRef
        .add({
          lastMessage: mymsg.text,
          lastSent: firestore.FieldValue.serverTimestamp(),
          sentBy: ourId,
          sentTo: otherId,
          parties: firestore.FieldValue.arrayUnion(otherId, ourId),
        })
        .then(d => {
          console.log('d,id==>', d.id);
          setChatId(d.id);
          chatRef.doc(d.id).collection('message').add(mymsg);
        });
    }
    // update in the existing chat
    const chatDoc = chatRef.doc(chatId);
    return await chatDoc
      .collection('message')
      .add(mymsg)
      .then(_ => {
        chatDoc.update({
          lastMessage: mymsg.text,
          lastSent: firestore.FieldValue.serverTimestamp(),
          sentBy: ourId,
          sentTo: otherId,
        });
      });
  };

  const onSend = messages => {
    const msg = {
      ...messages[0],
      sentBy: ourId,
      sentTo: otherId,
      createdAt: firestore.FieldValue.serverTimestamp(),
      deliveredTo: [],
      seen: [],
    };
    let mymsg = {};

    mymsg = {...msg};

    msgHandler(mymsg)
      .then(() => {})
      .catch(err => {
        console.error(`Couldn't send msg: ${err}`);
      });
  };

  const handleBubbleColor = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#86b1f2',
            padding: '2%',
          },
          left: {
            marginLeft: '-10%',
            backgroundColor: '#e0ecff',
            padding: '2%',
          },
        }}
        textStyle={{right: {color: '#000'}, left: {color: '#000'}}}
      />
    );
  };

  const handleSend = props => {
    if (!props.text.trim()) {
      // text box empty
      return (
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 0,
          }}></View>
      );
    }
    return (
      <Send {...props}>
        <MaterialCommunityIcons
          name="send-circle-outline"
          size={25}
          style={{
            bottom: 8,
            marginRight: '8%',
            borderColor: 'white',
            padding: 2,
          }}
          color={'blue'}
        />
      </Send>
    );
  };

  // ***
  return (
    <View style={styles.mainContainer}>
      <GiftedChat
        messages={message}
        onSend={messages => {
          onSend(messages);
        }}
        user={{
          _id: ourId,
        }}
        textInputProps={{
          autoCorrect: true,
          color: '#000',
        }}
        text={customText}
        onInputTextChanged={onChangeInputText}
        placeholder={'Type message here...'}
        placeholderTextColor="#000"
        renderBubble={handleBubbleColor}
        alwaysShowSend
        renderSend={handleSend}
        scrollToBottom
        // scrollToBottomComponent={scrollToBottomComponentButton}
        // renderCustomView={renderCustomView}
        // renderChatFooter={() => renderChatFooter(message)}
        // renderInputToolbar={customInputToolbar}
        // renderMessageVideo={renderMessageVideo}
        // renderSystemMessage={renderSystemMessage}
        // renderTicks={handleRenderTicks}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fafafa',
    minHeight: '100%',
  },
});
