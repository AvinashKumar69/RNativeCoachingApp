import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Button, Card} from 'react-native-paper';
import {useSelector} from 'react-redux';

import {AuthenticationContext} from '../services/AuthContext';

const CreatorCard = () => {
  const {user} = useContext(AuthenticationContext);
  const allChatDetail = useSelector(state => state?.allChatDetail);
  const navigation = useNavigation();

  const creatorID = 'N4ggJKkS3fFr3aldhpWG'; // TODO: creatorId for the creator needs to be decided
  const otherUsersData = allChatDetail?.chatListOtherUsersDetail;
  const chatData = allChatDetail.chatDetail;

  const creatorChatHandler = () => {
    navigation.navigate('ConversationStack', {
      screen: 'Chat',
      params: {
        otherId: creatorID,
        ourId: user?.uid,
        docId:
          otherUsersData[creatorID] === undefined
            ? undefined
            : chatData[creatorID]?.docId,
      },
    });
  };

  const LeftContent = props => <Avatar.Icon {...props} icon="code-tags" />;

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Avinash Kumar"
        subtitle="React Native Developer"
        //
        style={{height: 80}}
        titleNumberOfLines={1}
        subtitleNumberOfLines={2}
        //
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
        //
        left={LeftContent}
      />

      {/* <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content> */}

      <Card.Cover
        source={require('../assets/images/AviWithLaptop1.jpeg')}
        style={styles.cardCover}
      />

      <Card.Actions style={{height: 80}}>
        <Button onPress={() => console.log('pressed1')} style={styles.button}>
          View Profile
        </Button>
        <Button onPress={creatorChatHandler} style={styles.button}>
          Chat with Me
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default CreatorCard;

const styles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#86b1f2',
    marginVertical: 20,
  },
  cardCover: {
    resizeMode: 'contain',
    // width:'90%',
    height: 400,
    // marginVertical:20,
    borderRadius: 5,
  },
  cardTitle: {
    // color: '#000',
    fontWeight: '700',
  },
  cardSubtitle: {
    color: '#808080',
    fontWeight: '500',
  },
  button: {
    borderRadius: 5,
  },
});
