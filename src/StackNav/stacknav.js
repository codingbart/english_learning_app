import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Login/loginscreen";
import RegisterScreen from "../screens/Login/registerscreen";
import DrawerNavigator from "../DrawNav/drawnav";


const Stack = createStackNavigator();

function StackNavigator(){
    return(
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Langly" component={DrawerNavigator} options={{ headerShown: false}} />       
        </Stack.Navigator>
    );
}

export default StackNavigator;