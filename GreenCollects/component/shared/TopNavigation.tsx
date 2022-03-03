import React, { useState } from "react";

import {
    MenuItem,
    OverflowMenu,
    TopNavigationAction,
    TopNavigation as TopNavigationUI,
} from "@ui-kitten/components";

import { InfoIcon, LogoutIcon, MenuIcon } from "../icons/icons";

// Top bar to render information like view title.
// This top bar contain actions and could be enhanced.
const TopNavigation = ({ title, subtitle }: any) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
    );

    const renderRightActions = () => (
        <OverflowMenu
            anchor={renderMenuAction}
            visible={menuVisible}
            onBackdropPress={toggleMenu}
        >
            <MenuItem accessoryLeft={InfoIcon} title="À propos" />
            <MenuItem accessoryLeft={LogoutIcon} title="Déconnexion" />
        </OverflowMenu>
    );

    return (
        <TopNavigationUI
            alignment="center"
            title={title}
            subtitle={subtitle}
            accessoryRight={renderRightActions}
        />
    );
};

export default TopNavigation;
