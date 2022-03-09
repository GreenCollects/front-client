import React from 'react'
import { Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from '@ui-kitten/components';

import tw from "twrnc";

import TopNavigation from "../shared/TopNavigation";

const LastName = (props:any) => {
    const lastname = props.route.params.lastname
    const [value] = React.useState(lastname)

    const setValue = (nextValue:any) => {
        console.log(nextValue)
    }
    return(
        <SafeAreaView style={styles.safecontainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Nom</Text>
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

export default LastName;