import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CollectCreation from "../CollectCreation";
import Map from "../Map";
import Navbar from "../shared/Navbar";
import UserProfil from "../UserProfil";

const BottomTab = createBottomTabNavigator();

// Navigator for the bottom navigation
const BottomNavigator = () => {
    return (
        <BottomTab.Navigator
            tabBar={(props) => <Navbar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <BottomTab.Screen
                name="CollectCreation"
                component={CollectCreation}
                options={{
                    title: "Créer une collecte",
                }}
            />
            <BottomTab.Screen
                name="Carte"
                component={Map}
                options={{
                    title: "Accueil",
                }}
            />

            <BottomTab.Screen
                name="Profil"
                component={UserProfil}
                options={{
                    title: "Profil",
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomNavigator;
