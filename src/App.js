import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home/homescreen';
import QuizScreen from './screens/Quiz/quiz';
import CardsScreen from './screens/Cards/cards';
import DictionaryScreen from './screens/Dictionary/dictionary';
import IrregularsScreen from './screens/Irregular_verbs/irregulars';
import StatsScreen from './screens/Ach_Stat/stats';
import SettingsScreen from './screens/Settings/settings';
import LoginScreen from './screens/Login/loginscreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Quiz" component={QuizScreen} />
      <Drawer.Screen name="Irregulars" component={IrregularsScreen} />
      <Drawer.Screen name="Dictionary" component={DictionaryScreen} />
      <Drawer.Screen name="Cards" component={CardsScreen} />
      <Drawer.Screen name="Statistics" component={StatsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Langly" component={MainNavigator} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
