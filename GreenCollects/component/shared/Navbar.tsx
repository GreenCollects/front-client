import React, { useState } from "react";

import tw from "twrnc"
import { StyleSheet, View } from "react-native";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";

import { CalendarIcon, MapIcon, PersonIcon } from "../icons/icons";
import { StatusBar } from "expo-status-bar";

const Navbar = ({ navigation, state }: any) => {
    const [selectedIndex, setSelectedIndex] = useState();

    const handleSelect = (index: any) => {
        setSelectedIndex(index);
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <View>
        <BottomNavigation selectedIndex={selectedIndex} onSelect={handleSelect}>
            <BottomNavigationTab icon={<CalendarIcon />} title="ORGANISER" />
            <BottomNavigationTab icon={<MapIcon />} title="CARTE" />
            <BottomNavigationTab icon={<PersonIcon />} title="PROFIL" />
        </BottomNavigation>
        <StatusBar style="auto"/>
        </View>
    );
};

export default Navbar;
