import { Button, Icon, Input } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tailwind from "twrnc";
import environment from "../../environment";
import login from "../store/reducers/authentication"
import { RootState } from "../store/Store";
import { LOGIN, LOGOUT } from "../store/types";

const Login = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [formValidated, setFormValidated] = useState(false);


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
                err.message,
                [
                    {text: "Cancel", style: "cancel"},
                    { text: "OK"}
                ]
            );
        });
    };

    useEffect(() => {
        if (usernameErr === '' && passwordErr === '') {
            setFormValidated(true);
        } else {
            setFormValidated(false);
        }
    });

    const handleUsernameFieldChange = (newValue: string) => {
        if (newValue.length < 1){
            setUsernameErr('Username to short (min 1 character')
        }else{
            setUsernameErr('');
        }

        setUsername(newValue);
    }

    const handlePasswordFieldChange = (newValue: string) => {
        if (newValue.length <= 5){
            setPasswordErr('Username to short (min 8 character')
        }else{
            setPasswordErr('');
        }

        setPassword(newValue);
    }

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
                err.message,
                [
                    {text: "Cancel", style: "cancel"},
                    { text: "OK"}
                ]
            );
        });
    };

    return (
        <View>
            {
                token ? (
                    <Button onPress={() => handleLogout()}>
                        Logout
                    </Button>
                ) : (
                    <View>  
                        <Input
                            placeholder='Username'
                            onChangeText={nextValue => handleUsernameFieldChange(nextValue)}
                        />
                        <View style={styles.captionContainer}>
                            <Icon name='alert-circle-outline'/>
                            <Text style={styles.captionText}>Test {usernameErr}</Text>
                        </View>

                        <Input
                            placeholder='Password'
                            onChangeText={nextValue => handlePasswordFieldChange(nextValue)}
                        />
                        <View style={styles.captionContainer}>
                            <Icon name='alert-circle-outline'/>
                            <Text style={styles.captionText}>Test {passwordErr}</Text>
                        </View>
                        
                        <Button onPress={() => handleLogin()} disabled={!formValidated}>
                            Login
                        </Button>
                        
                        <Button disabled={true}>
                            Create account (Not Available)
                        </Button>
                    </View>
                )
                
            }
        </View>
    );
};

const styles = StyleSheet.create({
  captionContainer: tailwind`flex flex-1`,
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "red",
  }
});

export default Login;