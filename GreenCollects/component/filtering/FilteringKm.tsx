import React, {useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Icon } from '@ui-kitten/components';
import tw from 'twrnc';
import ChooseKm from "./ChooseKm";
import { ChevronIcon } from "../icons/icons";

const DISTANCES = [3, 5, 10, 15, 30];

const FilteringKm = ({updateRadius}:any) => {
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(2);

    return (
        <View style={styles.safecontainer}>
            <Button style={styles.button} accessoryRight={ChevronIcon} onPress={() => {
                setVisible(true);
                }
            }>
                {DISTANCES[selectedIndex]} km
            </Button>

            <ChooseKm visible={visible} setVisible={setVisible} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} distances={DISTANCES} updateRadius={updateRadius}/>
        </View>
    );
};

const styles = StyleSheet.create({
    button: tw`rounded-full`,
    safecontainer: tw`flex flex-1 items-center z-50 max-h-10 absolute inset-15`,
  });

export default FilteringKm;