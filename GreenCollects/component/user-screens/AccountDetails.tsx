import React from 'react'
import { Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from '@ui-kitten/components';

import { PersonIcon } from "../icons/icons";
import { ShareIcon } from "../icons/icons";
import { DoneIcon } from "../icons/icons";



import tw from "twrnc";

import TopNavigation from "../shared/TopNavigation";

const AccountDetails = (props:any) => {

    return (
        <SafeAreaView style={styles.safecontainer}>
            <View>
                <Button accessoryLeft={PersonIcon} style={styles.button} appearance='outline'>
                    <Text style={styles.buttonLabel}>
                        Mon Profile
                    </Text>
                </Button>
            </View>
            <View>
                <Button accessoryLeft={ShareIcon} style={styles.button} appearance='outline'>
                    <Text style={styles.buttonLabel}>
                        Collects créées 
                    </Text>
                </Button>
            </View>
            <View>
                <Button accessoryLeft={DoneIcon} style={styles.button} appearance='outline'>
                    <Text style={styles.buttonLabel}>
                        Collects participées
                    </Text>
                </Button>
            </View>
        </SafeAreaView>
    );
    

}

const styles = StyleSheet.create({
    safecontainer: tw`flex flex-1 items-center`,
    button: tw`m-2 bg-white w-50 text-black`,
    buttonLabel: tw`text-black`,
  });

export default AccountDetails