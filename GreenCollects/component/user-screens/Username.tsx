import React from 'react'
import { Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from '@ui-kitten/components';

import tw from "twrnc";

import TopNavigation from "../shared/TopNavigation";

const Username = (props:any) => {
    const username = props.route.params.username
    const [value] = React.useState(username)

    const setValue = (nextValue:any) => {
        console.log(nextValue)
    }
    return(
        <SafeAreaView style={styles.safecontainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Nom d'utilisateur</Text>
                <Input
                    value={value}
                    onChangeText={nextValue => setValue(nextValue)}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safecontainer: tw`flex flex-1`,
    container: tw`flex`,
    title: tw`text-center text-3xl mb-8 text-slate-500`,

});

export default Username;