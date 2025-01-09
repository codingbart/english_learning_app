import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "../screens/Settings/settings";
import QuizScreen from "../screens/Quiz/quiz";
import StatsScreen from "../screens/Ach_Stat/stats";
import IrregularsScreen from "../screens/Irregular_verbs/irregulars";
import TabNav from "../TabNav/tabnav";

const Drawer = createDrawerNavigator();

function DrawerNavigator(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="HomeTab" component={TabNav} options={{ headerShown: false, title: 'Home' }}/>
            <Drawer.Screen name="Quiz" component={QuizScreen} />
            <Drawer.Screen name="Irregulars" component={IrregularsScreen} />
            <Drawer.Screen name="Statistics" component={StatsScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;