import React, { useState } from "react";

import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";

import { CalendarIcon, MapIcon, PersonIcon } from "../icons/icons";

const Navbar = ({ navigation, state }: any) => {
    const [selectedIndex, setSelectedIndex] = useState();

    const handleSelect = (index: any) => {
        setSelectedIndex(index);
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <BottomNavigation selectedIndex={selectedIndex} onSelect={handleSelect}>
            <BottomNavigationTab icon={<CalendarIcon />} title="ORGANISER" />
            <BottomNavigationTab icon={<MapIcon />} title="CARTE" />
            <BottomNavigationTab icon={<PersonIcon />} title="PROFIL" />
        </BottomNavigation>
    );
};

export default Navbar;
