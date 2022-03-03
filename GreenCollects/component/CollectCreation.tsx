import React from "react";

import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";

import TopNavigation from "./shared/TopNavigation";

// TODO: replace this component to render the real creation of a collect interface
const CollectCreation = (props: any) => {
    return (
        <SafeAreaView style={styles.safecontainer}>
            <View>
                <TopNavigation title="Organiser une récolte" />
            </View>
            <Text>Hello Collect Creation</Text>
        </SafeAreaView>
    );
};

// Variable to store and centralized style for these components
const styles = StyleSheet.create({
    safecontainer: tw`flex flex-1`,
});

export default CollectCreation;
