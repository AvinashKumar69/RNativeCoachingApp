import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Button, Card} from 'react-native-paper';

const CreatorCard = () => {
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
        <Button onPress={() => console.log('pressed2')} style={styles.button}>
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
