import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/Home/homescreen';
import QuizScreen from './screens/Quiz/quiz';
import CardsScreen from './screens/Cards/cards';
import DictionaryScreen from './screens/Dictionary/dictionary';
import IrregularsScreen from './screens/Irregular_verbs/irregulars';
import StatsScreen from './screens/Ach_Stat/stats';
import SettingsScreen from './screens/Settings/settings';
import LoginScreen from './screens/Login/loginscreen';
import RegisterScreen from './screens/Login/registerscreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator(){
  return(
      <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Mapowanie ikon
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cards') {
            iconName = focused ? 'albums' : 'albums-outline';
          } else if (route.name === 'Dictionary') {
            iconName = focused ? 'book' : 'book-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Cards" component={CardsScreen}/>
        <Tab.Screen name="Dictionary" component={DictionaryScreen}/>
      </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Quiz" component={QuizScreen} />
      <Drawer.Screen name="Irregulars" component={IrregularsScreen} />
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
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Langly" component={TabNavigator} options={{ headerShown: false}} />       
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
 