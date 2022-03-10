import React, { useState } from "react";

import tw from "twrnc";
import { StyleSheet, Text } from "react-native";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";

import { CalendarIcon, MapIcon, PersonIcon } from "../icons/icons";

const Navbar = ({ navigation, state }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleSelect = (index: any) => {
    setSelectedIndex(index);
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={handleSelect}
      style={styles.navigation}
      indicatorStyle={styles.tab}
    >
      <BottomNavigationTab
        icon={<CalendarIcon fill={selectedIndex == 0 ? "#54e096" : "#aaa"} />}
        title={ () =>
          <Text style={{ color: selectedIndex == 0 ? "#54e096" : "#aaa" }}>
            ORGANISATION
          </Text>
        }
      />
      <BottomNavigationTab
        icon={<MapIcon fill={selectedIndex == 1 ? "#54e096" : "#aaa"} />}
        title={ () =>
          <Text style={{ color: selectedIndex == 1 ? "#54e096" : "#aaa" }}>
            CARTE
          </Text>
        }
      />
      <BottomNavigationTab
        icon={<PersonIcon fill={selectedIndex == 2 ? "#54e096" : "#aaa"} />}
        title={ () =>
          <Text style={{ color: selectedIndex == 2 ? "#54e096" : "#aaa" }}>
            PROFIL
          </Text>
        }
      />
    </BottomNavigation>
  );
};

const styles = StyleSheet.create({
  navigation: tw`ios:pb-4`,
  tab: tw`bg-[#54e096]`,
});

export default Navbar;
