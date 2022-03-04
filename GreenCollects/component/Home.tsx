import React from "react";
import tw from "twrnc";

import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Button, Spinner } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavigation from "./shared/TopNavigation";

// Loading animation to delete in next commits
const LoadingIndicator = (props: any) => (
    <View style={[props.style]}>
        <Spinner size="small" />
    </View>
);

// Home page of the application
const Home = (props: any) => {
    return (
        <SafeAreaView style={styles.safecontainer}>
            <View>
                <TopNavigation title='Accueil'/>
            </View>
            <View style={styles.container}>
                <Button appearance="outline" accessoryLeft={LoadingIndicator}>
                    En attente...
                </Button>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

// Variable to store and centralized style for these components
const styles = StyleSheet.create({
    container: tw`flex flex-1 bg-white items-center justify-center`,
    safecontainer: tw`flex flex-1`,
});

export default Home;
