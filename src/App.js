import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { useContext } from 'react';
import StackNavigator from './StackNav/stacknav';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

function MainNavigator() {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
            <StackNavigator />
            <StatusBar style={isDarkTheme ? "light" : "dark"} />
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <MainNavigator />
        </ThemeProvider>
    );
}
