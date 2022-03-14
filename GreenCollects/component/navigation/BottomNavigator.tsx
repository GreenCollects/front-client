import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CollectCreation from "../collect-screens/CollectCreation";
import Navbar from "../shared/Navbar";
import MapNavigator from "./MapNavigator";
import UserNavigator from "./UserNavigator";
import CollectNavigator from "./CollectNavigator";

const BottomTab = createBottomTabNavigator();

// Navigator for the bottom navigation
const BottomNavigator = () => {
    return (
        <BottomTab.Navigator
            tabBar={(props) => <Navbar {...props} />}
            screenOptions={{ headerShown: false }}
            initialRouteName="Carte"
        >
            <BottomTab.Screen
                name="CollectCreation"
                component={CollectNavigator}
                options={{
                    title: "Créer une collecte",
                }}
            />
            <BottomTab.Screen
                name="Carte"
                component={MapNavigator}
                options={{
                    title: "Carte",
                    headerShown: false
                }}
            />
            <BottomTab.Screen
                name="Profil"
                component={UserNavigator}
                options={{
                    title: "Profil",
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomNavigator;
