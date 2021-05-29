import React, { useEffect } from 'react';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text, Divider, List } from '@ui-kitten/components';

import Colors from '../config/Colors';
import Menu from '../assets/data/MealMenu';
import { initialData } from '../utils/Storage';

const Item = ({ item, id }) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('MealSelection', { id })}>
      <View style={styles.listItemWrapper}>
        <View style={styles.listItemTextWrapper}>
          <Text style={styles.listItemTitle}>{item.title}</Text>
          <Text style={styles.listItemDescription}>{item.description}</Text>
        </View>
        <Image style={styles.listItemImage} source={item.image} />
      </View>
    </TouchableHighlight>
  );
};

const renderItem = ({ item }) => {
  return <Item item={item} id={item.id} />;
};

const HomeScreen = () => {
  useEffect(() => {
    (() => {
      Menu.forEach(async meal => {
        await initialData(meal.id);
      });
    })();
  }, []);

  return (
    <Layout style={styles.container}>
      <Text style={styles.promptText} category="h5">
        الرجاء إختيار قائمة الوجبات:
      </Text>
      <List
        style={styles.list}
        data={Menu}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  promptText: {
    fontFamily: 'Almarai-Bold',
    alignSelf: 'flex-end',
  },
  list: {
    direction: 'ltr',
    backgroundColor: Colors.white,
    marginTop: 10,
  },
  listItem: {
    direction: 'rtl',
    backgroundColor: Colors.white,
  },
  listItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  listItemTextWrapper: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  listItemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  listItemTitle: {
    fontFamily: 'Almarai-Bold',
  },
  listItemDescription: {
    fontSize: 10,
    fontFamily: 'Almarai-Regular',
  },
});

export default HomeScreen;
