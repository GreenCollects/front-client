import React from "react";

import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";

import TopNavigation from "./shared/TopNavigation";

// TODO: Change this component to render the real user profil
const UserProfil = (props: any) => {
    return (
        <SafeAreaView>
            <View>
                <TopNavigation title="Mon profil" />
            </View>
            <Text>Hello User Profil</Text>
        </SafeAreaView>
    );
};

// Variable to store and centralized style for these components
const styles = StyleSheet.create({
    safecontainer: tw`flex flex-1`,
});

export default UserProfil;
