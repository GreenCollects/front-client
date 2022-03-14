import React from 'react'
import { Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from '@ui-kitten/components';

import tw from "twrnc";

import TopNavigation from "../shared/TopNavigation";
import { DoneIcon } from "../icons/icons";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Username = (props:any) => {
    const username = props.route.params.username
    const [value, setValue] = React.useState(username)
    const [visible, setVisible] = React.useState(false);

    const handleChange = (nextValue:any) => {
        setValue(nextValue);
        if(username == nextValue){
            setVisible(false)
        }
        else{
            setVisible(true)
        }
    }
    return(
        <SafeAreaView style={styles.safecontainer}>
            <View style={styles.container}>
                <View style={tw`flex flex-row justify-center`}>
                    <Text style={styles.title}>Nom d'utilisateur</Text>
                    {
                    visible == true ?
                    <TouchableOpacity onPress={()=>console.log('test')}>
                        <DoneIcon style={styles.icon} fill='#54e096'/>
                    </TouchableOpacity> 
                    :
                    <View>
                    </View>
                    }
                </View>
                
                <Input
                    value={value}
                    onChangeText={nextValue => handleChange(nextValue)}
                    style={tw`bg-white m-1`}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safecontainer: tw`flex flex-1 bg-white`,
    container: tw`flex`,
    title: tw`text-center text-3xl mb-8 text-slate-500 mr-3`,
    icon: tw`h-7 w-7 mr-4 mt-1`,
});

export default Username;