import React, { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button, Divider, Icon, Layout } from '@ui-kitten/components';
import { mealState } from '../store';

import HeaderTitle from '../components/headers/HeaderTitle';
import Colors from '../config/Colors';
import { getData, storeData, initialData } from '../utils/Storage';

const AddIcon = props => <Icon {...props} name="plus-outline" />;
const DeleteIcon = props => <Icon {...props} name="trash-2-outline" />;

const Item = ({ item }) => {
  const route = useRoute();
  const { id } = route.params;
  const [meals, setMeals] = mealState.use();

  const deleteButtonHandler = async () => {
    const meal = meals.find(el => el === item);
    if (meal) {
      const currentMeals = meals.filter(el => el !== item);
      await storeData(id, JSON.stringify(currentMeals));
      setMeals(currentMeals);
    }
  };

  return (
    <View style={styles.itemWrapper}>
      <View style={styles.itemInnerWrapper}>
        <Button
          style={styles.itemButton}
          status="danger"
          appearance="ghost"
          accessoryLeft={DeleteIcon}
          onPress={deleteButtonHandler}
        />
        <Text style={styles.itemText}>{item}</Text>
      </View>
      <Divider />
    </View>
  );
};

const renderItem = ({ item }) => {
  return <Item item={item} />;
};

const MealListScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [meal, setMeal] = useState('');
  const [meals, setMeals] = mealState.use();

  useEffect(() => {
    switch (id) {
      case 'BREAKFAST':
        navigation.setOptions({
          headerTitle: props => (
            <HeaderTitle {...props} title="قائمة وجبة الإفطار" />
          ),
        });
        break;
      case 'LUNCH':
        navigation.setOptions({
          headerTitle: props => (
            <HeaderTitle {...props} title="قائمة وجبة الغداء" />
          ),
        });
        break;
      case 'DINNER':
        navigation.setOptions({
          headerTitle: props => (
            <HeaderTitle {...props} title="قائمة وجبة العشاء" />
          ),
        });
        break;
    }
  }, [id, navigation]);

  useEffect(() => {
    (async () => {
      const storedMeals = await getData(id);
      if (storedMeals !== null) {
        setMeals(JSON.parse(storedMeals));
      } else {
        initialData(id);
      }
    })();
  }, [id, setMeals]);

  const addButtonHandler = async () => {
    const curentMeals = [...meals, meal];
    setMeals(curentMeals);
    setMeal('');
    await storeData(id, JSON.stringify(curentMeals));
  };

  return (
    <Layout style={styles.container}>
      <FlatList
        style={styles.list}
        data={meals}
        renderItem={renderItem}
        keyExtractor={(m, index) => index}
      />
      <KeyboardAvoidingView
        style={styles.inputWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInput
          style={styles.inputText}
          placeholder="أكتب أسم الوجبة..."
          placeholderTextColor="#ffffff"
          value={meal}
          onChangeText={text => setMeal(text)}
        />
        <Button
          style={styles.inputButton}
          accessoryLeft={AddIcon}
          onPress={addButtonHandler}
        />
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {},
  itemWrapper: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  itemInnerWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemText: {
    fontFamily: 'Almarai-Regular',
    marginBottom: 5,
    alignSelf: 'center',
  },
  itemButton: {
    alignSelf: 'center',
  },
  inputWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 60 : 20,
    padding: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputText: {
    flex: 1,
    fontFamily: 'Almarai-Regular',
    backgroundColor: '#fab1a0',
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  inputButton: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
});

export default MealListScreen;
