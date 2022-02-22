import React from "react";
import tw from "twrnc";

import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Button, Spinner } from "@ui-kitten/components";

// Loading animation to delete in next commits
const LoadingIndicator = (props: any) => (
    <View style={[props.style]}>
        <Spinner size="small" />
    </View>
);

// Home page of the application
const Home = () => {
    return (
        <View style={styles.container}>
            <Button appearance="outline" accessoryLeft={LoadingIndicator}>
                En attente...
            </Button>
            <StatusBar style="auto" />
        </View>
    );
};

// Variable to store and centralized style for these components
const styles = StyleSheet.create({
    container: tw`flex flex-1 bg-white items-center justify-center`,
});

export default Home;
