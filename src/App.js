import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import StackNavigator from './StackNav/stacknav';

function App() {
  return (
    <NavigationContainer>
        <StackNavigator/>
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default App;