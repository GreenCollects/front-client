import React from 'react'
import { Text, View, StyleSheet, Alert, Button, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Button } from '@ui-kitten/components';

import { PersonIcon } from "../icons/icons";
import { ShareIcon } from "../icons/icons";




import tw from "twrnc";

import TopNavigation from "../shared/TopNavigation";

const AccountDetails = (props:any) => {

    const myProfileNavigation = () => {
        props.navigation.navigate("Mon Profil")
    }

    const myCollectionsNavigation = () => {
        props.navigation.navigate("Mes Collectes")
    }

    return (
        <SafeAreaView style={styles.safecontainer}>
            <View>
                <TouchableOpacity
                    style={[styles.button, styles.shadow]}
                    onPress={myProfileNavigation}
                >
                    <PersonIcon style={styles.icon} fill='#54e096'/>
                    <Text style={styles.text}>Mon Profil</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity
                    style={[styles.button, styles.shadow]}
                    onPress={myCollectionsNavigation}
                >
                    <ShareIcon style={styles.icon} fill='#54e096'/>
                    <Text style={styles.text}>Mes Collectes</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
    

}

const styles = StyleSheet.create({
    safecontainer: tw`flex flex-1 items-center bg-white`,
    button: tw`p-2 border-[#54e096] border-2 rounded-lg flex-row items-center m-2 w-90`,
    text: tw`font-semibold mr-3 text-slate-500`,
    icon: tw`h-7 w-7 mr-4`,
    shadow: {
        shadowColor: '#54e096', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: 'white',
        elevation: 2, // Android
    }
  });

export default AccountDetails