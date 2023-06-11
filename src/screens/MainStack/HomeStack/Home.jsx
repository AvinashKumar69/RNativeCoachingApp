import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, SafeAreaView, FlatList, Text} from 'react-native';
import {Button} from 'react-native-paper';

import CreatorCard from '../../../components/CreatorCard';

const Home = () => {
  const navigation = useNavigation();

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const signOutHandler = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(error => console.error(error));
  };

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.topContainer}>
      {/* <Button
        icon="arrow-right-circle-outline"
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabelStyle}
        onPress={() => {
          navigation.navigate('Notes');
        }}>
        Notes Screen
      </Button> */}

      <CreatorCard />

      {/* <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      /> */}

      {/* <Button
        icon="logout"
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabelStyle}
        onPress={signOutHandler}>
        Sign Out
      </Button> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  topContainer: {
    // minHeight: '100%',
    flex: 1,
    // flexWrap:'wrap',
    backgroundColor: '#fafafa',
  },
  button: {
    borderRadius: 5,
    marginVertical: '2%',
    backgroundColor: '#273a94',
    width: '50%',
    alignSelf: 'center',
  },
  buttonLabelStyle: {
    color: '#fafafa',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
