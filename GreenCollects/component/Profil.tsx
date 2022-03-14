import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";

import TopNavigation from "./shared/TopNavigation";
import Login from "./shared/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./shared/Register";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/Store";
import { Button, Card } from "@ui-kitten/components";
import environment from "../environment";
import { LOGOUT, PROFIL } from "./store/types";
import { getCurrentUser, logout } from "./api/account";
import Toast from "react-native-root-toast";

const Stack = createNativeStackNavigator();

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
            }
            dispatch({ type: LOGOUT });
        };
        doLogout().catch((err) => console.log(err));
    };

    return (
        <SafeAreaView>
            <View>
                <TopNavigation title="Mon profil" />
            </View>
            <Card>
                <Text>Username : {user.username}</Text>
                <Text>Email : {user.email}</Text>
                <Text>First name : {user.first_name}</Text>
                <Text>Last name : {user.last_name}</Text>
            </Card>
            <Button onPress={() => handleLogout()}>Logout</Button>
        </SafeAreaView>
    );
};

// Variable to store and centralized style for these components
const styles = StyleSheet.create({
    safecontainer: tw`flex flex-1`,
});

export default UserProfil;
