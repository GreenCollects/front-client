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

const Stack = createNativeStackNavigator();

const UserProfil = () => {
    const dispatch = useDispatch();

    const token = useSelector((state: RootState) => state.authentication.token);
    const user = useSelector((state: RootState) => state.authentication.user);

    var url = environment.SERVER_API_URL + '/api/account/';

    useEffect(() => {
        getCurrentUser();
    }, [user]);

    const getCurrentUser = () => {
        fetch(`${url}current-user/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }).then(function(response) {
            if (response.ok) {
                response.json().then(data => {
                    dispatch({
                        type: PROFIL, 
                        value:{
                            user: data
                        }
                    });
                });
            }
        }).catch(err => {
            Alert.alert(
                "Error : retrive current user",
                err.message,
                [
                    {text: "Cancel", style: "cancel"},
                    { text: "OK"}
                ]
            );
        });
    };

    const handleLogout = () => {
        fetch(`${url}logout/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": user.username
            })
        }).then(function(response) {
            if (response.ok) {
                dispatch({type: LOGOUT});
            }
        }).catch(err => {
            Alert.alert(
                "Error : logout",
                err.message,
                [
                    {text: "Cancel", style: "cancel"},
                    { text: "OK"}
                ]
            );
        });
    };

    return (
        (
            !token ? (               
                <Stack.Navigator initialRouteName={"login"}>
                        <Stack.Screen name="login" component={Login} />
                        <Stack.Screen name="register" component={Register} />
                </Stack.Navigator>
            ) : (
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
                    <Button onPress={() => handleLogout()}>
                        Logout
                    </Button>
                </SafeAreaView>
            )
        )     
    );
};

// Variable to store and centralized style for these components
const styles = StyleSheet.create({
    safecontainer: tw`flex flex-1`,
});

export default UserProfil;
