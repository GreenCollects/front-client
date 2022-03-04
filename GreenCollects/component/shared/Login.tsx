import { Button } from "@ui-kitten/components";
import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import environment from "../../environment";
import login from "../store/reducers/authentication"
import { RootState } from "../store/Store";
import { LOGIN, LOGOUT } from "../store/types";

const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('dodo');
    const [password, setPassword] = useState('dorian');
    const token = useSelector((state: RootState) => state.authentication.token);

    var url = environment.SERVER_API_URL + '/api/account/';

    const handleLogin = () => {
        fetch(`${url}login/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(function(response) {
            if (response.ok) {
                response.json().then(data => {
                    dispatch({type: LOGIN, value: {username: username, token: data["token"]}});
                });
            }
        }).catch(err => {
            Alert.alert(
                "Error : login",
                err,
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
                "username": username
            })
        }).then(function(response) {
            dispatch({type: LOGOUT});
        }).catch(err => {
            Alert.alert(
                "Error : logout",
                err,
                [
                    {text: "Cancel", style: "cancel"},
                    { text: "OK"}
                ]
            );
        });
    };

    const handleCreate = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": "dodo",
                "password":"dorian",
                "email":"do.baret@gmail.com",
                "first_name":"dorian",
                "last_name":"baret"
            })
        }).then(function(response) {
            console.log(response.status);
        });
    };

    const styles = StyleSheet.create({
        baseText: {
          fontWeight: 'bold',
          color: 'red'
        }
    });

    return (
        <>
            {
                token ? (
                    <Button onPress={() => handleLogout()}>
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button onPress={() => handleLogin()}>
                            Login
                        </Button>
                        
                        <Button onPress={() => handleCreate()}>
                            Create account
                        </Button>
                    </>
                )
                
            }
        </>
    );
};

export default Login;