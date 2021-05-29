import AsyncStorage from '@react-native-async-storage/async-storage';

const initialData = async id => {
  try {
    const found = AsyncStorage.getItem(id);

    if (found == null || typeof found === 'undefined') {
      await AsyncStorage.setItem(id, JSON.stringify([]));
    }
    return true;
  } catch (e) {
    return false;
  }
};

const storeData = async (id, meals) => {
  try {
    await AsyncStorage.setItem(id, JSON.stringify(meals));
    return true;
  } catch (e) {
    return false;
  }
};

const getData = async id => {
  try {
    const mealStr = await AsyncStorage.getItem(id);

    if (mealStr !== null && typeof mealStr !== 'undefined') {
      const meals = JSON.parse(mealStr);
      return meals;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export { initialData, storeData, getData };
