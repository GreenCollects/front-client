import { Button, Icon, Input } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tailwind from "twrnc";
import environment from "../../environment";
import { RootState } from "../store/Store";
import { LOGIN } from "../store/types";

import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { EyeIcon, EyeOffIcon } from "../icons/icons";

const Login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [passwordSecureText, setPasswordSecureText] = useState(true);
    const [formValidated, setFormValidated] = useState(false);

    const USR_NAME_MIN_LENGTH = 1;
    const PWD_MIN_LENGTH = 5;

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
        if (!usernameErr && 
            !passwordErr &&
            username.length >= USR_NAME_MIN_LENGTH &&
            password.length >= PWD_MIN_LENGTH
        ) {
            setFormValidated(true);
        } else {
            setFormValidated(false);
        }
    }, [usernameErr, passwordErr]);

    const handleUsernameFieldChange = (newValue: string) => {
        if (newValue.length < USR_NAME_MIN_LENGTH){
            setUsernameErr(`Username to short (min ${USR_NAME_MIN_LENGTH} character)`)
        }else{
            setUsernameErr('');
        }

        setUsername(newValue);
    };

    const handlePasswordFieldChange = (newValue: string) => {
        if (newValue.length < PWD_MIN_LENGTH){
            setPasswordErr(`Password to short (min ${PWD_MIN_LENGTH} character)`)
        }else{
            setPasswordErr('');
        }

        setPassword(newValue);
    };

    const toggleSecureEntry = () => {
        setPasswordSecureText(!passwordSecureText);
    };

    const renderIcon = (props: any) => (
            <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            {
                passwordSecureText ? (
                    <EyeOffIcon {...props} />
                ) : (
                    <EyeIcon {...props} />
                )
            }
            </TouchableWithoutFeedback>
    );

    const renderStatus = (error: string) => {
        if (error) {
            return 'danger'
        } else {
            return 'basic'
        }
    }

    return (
        <View>  
            <Input
                placeholder='Username'
                onChangeText={nextValue => handleUsernameFieldChange(nextValue)}
                status={renderStatus(usernameErr)}
            />
            <Text style={styles.error}>{usernameErr}</Text>

            <Input
                placeholder='Password'
                onChangeText={nextValue => handlePasswordFieldChange(nextValue)}
                status={renderStatus(passwordErr)}
                secureTextEntry={passwordSecureText}
                accessoryRight={renderIcon}
            />
            <Text style={styles.error}>{passwordErr}</Text>
            
            <Button onPress={() => handleLogin()} disabled={!formValidated}>
                Login
            </Button>
            
            <Button
                onPress={() => {navigation.navigate("register" as never)}}
            >
                Create account
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    viewContainer: tailwind`flex flex-1`,
    error: tailwind`text-red-600`,
    loginContainer: tailwind`w-9/10`,
});

export default Login;