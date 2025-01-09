import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home/homescreen';
import CardsScreen from '../screens/Cards/cards';
import DictionaryScreen from '../screens/Dictionary/dictionary';

const Tab = createBottomTabNavigator();

function TabNav(){
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
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
        })}>
          <Tab.Screen name="Home" component={HomeScreen}/>
          <Tab.Screen name="Cards" component={CardsScreen}/>
          <Tab.Screen name="Dictionary" component={DictionaryScreen}/>
        </Tab.Navigator>
    );
}

export default TabNav;