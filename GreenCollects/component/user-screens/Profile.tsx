import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";

import TopNavigation from "../shared/TopNavigation";
// import Login from "../shared/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "../shared/Register";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { Button, Card } from "@ui-kitten/components";
import { LOGOUT, PROFIL } from "../store/types";
import { getCurrentUser, logout } from "../api/account";
import Toast from "react-native-root-toast";

import {ChevronRightIcon} from "../icons/icons";


const UserProfil = (props: any) => {

    const dispatch = useDispatch();

    const token = useSelector((state: RootState) => state.authentication.token);
    const user = useSelector((state: RootState) => state.authentication.user);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                const headers = new Headers();
                headers.append("Accept", "application/json");
                headers.append("Content-Type", "application/json");
                headers.append("Authorization", `Token ${token}`);

                const data: any = await getCurrentUser(headers);

                if (data !== undefined) {
                    dispatch({
                        type: PROFIL,
                        value: {
                            user: data,
                        },
                    });
                }
            };
            getUser().catch((err) => console.log(err));
        } else {
            props.navigation.navigate("Connexion");
        }
    }, [token]);

    const handleLogout = () => {
        const doLogout = async () => {
            const headers = new Headers();
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");

            const body = JSON.stringify({
                username: user.username,
            });

            const data: any = await logout(headers, body);

            if (data !== undefined) {
                Toast.show("Déconnexion réussie", {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: "#54e096",
                    textColor: "#fff",
                });

                dispatch({ type: LOGOUT });
            }
        };
        doLogout().catch((err) => console.log(err));
    };

    const goToUpdate = (title:any, field:any, fieldValue:any, fieldDescription:any) => {
        props.navigation.navigate(title, {field : field, fieldValue : fieldValue, fieldDescription:fieldDescription})
    }


    return (
        <SafeAreaView style={styles.safecontainer}>

            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Détails de mon compte</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                        style={[styles.button, styles.shadow]}
                        onPress={()=>goToUpdate("Votre nom d'utilisateur", "username", user.username, "Nom d'utilisateur")}
                        >
                        <Text style={styles.text}>Nom d'utilisateur</Text>
                        <Text style={styles.textInfo}>{user.username}</Text>
                        <ChevronRightIcon style={styles.icon} fill='#54e096'/>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                        style={[styles.button, styles.shadow]}
                        onPress={()=>goToUpdate("Votre email", "email", user.email, "Email")}
                        >
                        <Text style={styles.text}>Email</Text>
                        <Text style={styles.textInfo}>{user.email}</Text>
                        <ChevronRightIcon style={styles.icon} fill='#54e096'/>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                        style={[styles.button, styles.shadow]}
                        onPress={()=>goToUpdate("Votre prénom", "first_name", user.first_name, "Prénom")}
                        >
                        <Text style={styles.text}>Prénom</Text>
                        <Text style={styles.textInfo}>{user.first_name}</Text>
                        <ChevronRightIcon style={styles.icon} fill='#54e096'/>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                        style={[styles.button, styles.shadow]}
                        onPress={()=>goToUpdate("Votre nom", "last_name", user.last_name, "Nom d'utilisateur")}
                        >
                        <Text style={styles.text}>Nom</Text>
                        <Text style={styles.textInfo}>{user.last_name}</Text>
                        <ChevronRightIcon style={styles.icon} fill='#54e096'/>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                        style={[styles.buttonDeco, styles.shadowDeco]}
                        onPress={() => handleLogout()}
                        >
                        <Text style={styles.deco}>Déconnexion</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        </SafeAreaView>
    );
};

// Variable to store and centralized style for these components
const styles = StyleSheet.create({
    safecontainer: tw`flex flex-1 bg-white`,
    container: tw`flex`,
    buttonContainer: tw`mb-4`,
    title: tw`text-center text-3xl mb-8 text-slate-500`,
    button: tw`p-2 border-[#54e096] border-2 rounded-lg flex-row items-center m-2 w-90`,
    text: tw`font-semibold mr-3 text-slate-500`,
    icon: tw`h-7 w-7`,
    textInfo : tw` text-slate-500 ml-auto`,
    shadow: {
        shadowColor: '#54e096', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: 'white',
        elevation: 2, // Android
    },
    buttonDeco: tw`p-2 border-[#f00020] border-2 rounded-lg flex-row items-center m-2 w-90`,
    shadowDeco: {
        shadowColor: '#f00020', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: 'white',
        elevation: 2, // Android
    },
    deco : tw`font-semibold mr-3 text-rose-500`
});

export default UserProfil;
