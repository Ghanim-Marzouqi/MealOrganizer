import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import HeaderTitle from '../components/headers/HeaderTitle';
import Colors from '../config/Colors';
import { getData, initialData } from '../utils/Storage';
import { mealState } from '../store';

const window = Dimensions.get('window');

const MealSelection = ({ route, navigation }) => {
  const { id } = route.params;
  const [meal, setMeal] = useState('');
  const [meals, setMeals] = mealState.use();

  useEffect(() => {
    switch (id) {
      case 'BREAKFAST':
        navigation.setOptions({
          headerTitle: props => (
            <HeaderTitle {...props} title="إختيار وجبة الإفطار" />
          ),
        });
        break;
      case 'LUNCH':
        navigation.setOptions({
          headerTitle: props => (
            <HeaderTitle {...props} title="إختيار وجبة الغداء" />
          ),
        });
        break;
      case 'DINNER':
        navigation.setOptions({
          headerTitle: props => (
            <HeaderTitle {...props} title="إختيار وجبة العشاء" />
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

  const chooseMealButtonHandler = () => {
    const index = Math.floor(Math.random() * meals.length);
    const currentMeal = meals[index];
    setMeal(currentMeal);
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.mealWrapper}>
        <Text style={styles.mealPromptText}>
          إضغط على زر (إختر الوجبة) لمعرفة وجبة اليوم
        </Text>
        <ImageBackground
          style={styles.mealBackgroundImage}
          source={require('../assets/images/meal.png')}>
          <Text style={styles.mealTitle}>{meal}</Text>
        </ImageBackground>
      </View>
      <TouchableOpacity style={styles.button} onPress={chooseMealButtonHandler}>
        <Text style={styles.buttonText}>إختر الوجبة</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => navigation.navigate('MealList', { id })}>
        <Text style={styles.fabButtonText}>+</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealWrapper: {},
  mealPromptText: {
    fontFamily: 'Almarai-Regular',
    padding: 10,
    alignSelf: 'center',
  },
  mealBackgroundImage: {
    width: window.width,
    height: window.width,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealTitle: {
    fontFamily: 'Almarai-Bold',
    fontWeight: 'bold',
    width: 150,
    backgroundColor: Colors.white,
    textAlign: 'center',
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: {
      backgroundColor: Colors.black,
      padding: 20,
    },
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Almarai-Bold',
    color: Colors.white,
  },
  fabButton: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: Platform.OS === 'ios' ? 60 : 20,
    borderRadius: 50,
  },
  fabButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default MealSelection;
