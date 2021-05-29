import 'react-native-gesture-handler';
import * as React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// custom components
import HeaderTitle from './components/headers/HeaderTitle';
import Colors from './config/Colors';

// screens
import HomeScreen from './screens/HomeScreen';
import MealSelectionScreen from './screens/MealSelectionScreen';
import MealListScreen from './screens/MealListScreen';

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerTitle: props => (
                  <HeaderTitle {...props} title="الرئيسية" />
                ),
                headerStyle: { backgroundColor: Colors.primary },
              }}
            />
            <Stack.Screen
              name="MealSelection"
              component={MealSelectionScreen}
              options={{
                headerTitle: props => (
                  <HeaderTitle {...props} title="إختيار الوجبة" />
                ),
                headerStyle: { backgroundColor: Colors.primary },
                headerTintColor: Colors.white,
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="MealList"
              component={MealListScreen}
              options={{
                headerTitle: props => (
                  <HeaderTitle {...props} title="قائمة الوجبات" />
                ),
                headerStyle: { backgroundColor: Colors.primary },
                headerTintColor: Colors.white,
                headerBackTitleVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
