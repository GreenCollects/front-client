import React from 'react'
import { Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from '@ui-kitten/components';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";

import tw from "twrnc";

import TopNavigation from "../shared/TopNavigation";
import { DoneIcon } from "../icons/icons";
import { TouchableOpacity } from 'react-native';

import { putCurrentUser } from "../api/account";

import Toast from "react-native-root-toast";
import { UPDATE } from '../store/types';

const Username = (props:any) => {
    const dispatch = useDispatch();
    const fieldValue = props.route.params.fieldValue
    const field = props.route.params.field
    const fieldDescription = props.route.params.fieldDescription
    const [value, setValue] = React.useState(fieldValue)
    const [visible, setVisible] = React.useState(false);

    const token = useSelector((state: RootState) => state.authentication.token);
    const user = useSelector((state: RootState) => state.authentication.user);

    const handleChange = (nextValue:any) => {
        setValue(nextValue);

        if(fieldValue == nextValue){
            setVisible(false)
        }
        else{
            setVisible(true)
        }
    }

    const validChange = () => {
        const doChangement = async () => {
            const headers = new Headers();
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Token ${token}`);


            const body = JSON.stringify({
                ...user,
                [field]: value,
            });

            const data: any = await putCurrentUser(headers, body);

            if (data !== undefined) {
                Toast.show("Modification réussie", {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: "#54e096",
                    textColor: "#fff",
                });

                dispatch({type:UPDATE,
                    value: {
                        user: data,
                    }
                })

                props.navigation.navigate("Mon Profil");
            }
        };
        doChangement().catch((err) => console.log(err));
    }

    return(
        <SafeAreaView style={styles.safecontainer}>
            <View style={styles.container}>
                <View style={tw`flex flex-row justify-center`}>
                    <Text style={styles.title}>{fieldDescription}</Text>
                    {
                    visible == true ?
                    <TouchableOpacity onPress={()=> validChange()}>
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