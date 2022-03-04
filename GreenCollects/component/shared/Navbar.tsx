import React, { useState } from "react";

import tw from "twrnc";
import { StyleSheet } from "react-native";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";

import { CalendarIcon, MapIcon, PersonIcon } from "../icons/icons";

const Navbar = ({ navigation, state }: any) => {
    const [selectedIndex, setSelectedIndex] = useState();

    const handleSelect = (index: any) => {
        setSelectedIndex(index);
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
            style={styles.navigation}
        >
            <BottomNavigationTab icon={<CalendarIcon />} title="ORGANISER" />
            <BottomNavigationTab icon={<MapIcon />} title="CARTE" />
            <BottomNavigationTab icon={<PersonIcon />} title="PROFIL" />
        </BottomNavigation>
    );
};

const styles = StyleSheet.create({
    navigation: tw`ios:pb-4`,
});

export default Navbar;
