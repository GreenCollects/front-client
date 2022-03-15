import { Button, Icon, Input } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tailwind from "twrnc";
import { RootState } from "../store/Store";
import { LOGIN } from "../store/types";

import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { EyeIcon, EyeOffIcon } from "../icons/icons";
import { login } from "../api/account";
import Toast from "react-native-root-toast";

const Login = (props: any) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [usernameErr, setUsernameErr] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [passwordSecureText, setPasswordSecureText] = useState(true);
    const [formValidated, setFormValidated] = useState(false);

    const USR_NAME_MIN_LENGTH = 1;
    const PWD_MIN_LENGTH = 5;

    const handleLogin = () => {
        const getToken = async () => {
            const headers = new Headers();
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");

            const body = JSON.stringify({
                username: username,
                password: password,
            });

            const data: any = await login(headers, body)
                .then((response) => response)
                .catch((err) => console.log(err));

            if (data !== undefined) {
                Toast.show("Authentification réussie", {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: "#54e096",
                    textColor: "#fff",
                });
                dispatch({
                    type: LOGIN,
                    value: { username: username, token: data.token },
                });
                props.navigation.popToTop();
            }
        };

        getToken().catch((err) => console.log(err));
    };

    useEffect(() => {
        if (
            !usernameErr &&
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
        if (newValue.length < USR_NAME_MIN_LENGTH) {
            setUsernameErr(
                `Username to short (min ${USR_NAME_MIN_LENGTH} character)`
            );
        } else {
            setUsernameErr("");
        }

        setUsername(newValue);
    };

    const handlePasswordFieldChange = (newValue: string) => {
        if (newValue.length < PWD_MIN_LENGTH) {
            setPasswordErr(
                `Password to short (min ${PWD_MIN_LENGTH} character)`
            );
        } else {
            setPasswordErr("");
        }

        setPassword(newValue);
    };

    const toggleSecureEntry = () => {
        setPasswordSecureText(!passwordSecureText);
    };

    const renderIcon = (props: any) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            {passwordSecureText ? (
                <EyeOffIcon {...props} />
            ) : (
                <EyeIcon {...props} />
            )}
        </TouchableWithoutFeedback>
    );

    const renderStatus = (error: string) => {
        if (error) {
            return "danger";
        } else {
            return "basic";
        }
    };

    return (
        <View style={styles.viewContainer}> 
            <View style={styles.container}>
                <Text style={styles.title}>Se connecter</Text>
                <View>
                    <View style={styles.formUsername}>
                        <Text style={styles.usernameLabel}>
                            Nom d'utilisateur
                        </Text>
                        <Input
                            placeholder='Username'
                            onChangeText={nextValue => handleUsernameFieldChange(nextValue)}
                            status={renderStatus(usernameErr)}"none"
                            autoCapitalize=
                        />
                        <Text style={styles.error}>{usernameErr}</Text>
                    </View>

                    <View style={styles.formPwd}>
                        <Text style={styles.pwdLabel}>
                            Mot de passe
                        </Text>
                        <Input
                            placeholder='Password'
                            onChangeText={nextValue => handlePasswordFieldChange(nextValue)}
                            status={renderStatus(passwordErr)}
                            secureTextEntry={passwordSecureText}
                            accessoryRight={renderIcon}
                        />
                        <Text style={styles.error}>{passwordErr}</Text>
                    </View>

                    <View>
                        <Button style={tailwind`mb-2`} onPress={() => handleLogin()} disabled={!formValidated}>
                            Se connecter
                        </Button>

                        <Button
                            onPress={() => {navigation.navigate("Inscription" as never)}}
                        >
                            Créer un compte
                        </Button>
                    </View>
                    

                </View>
                
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    viewContainer: tailwind`flex flex-1 bg-white`,
    title: tailwind`text-center text-3xl mb-8 text-slate-500`,
    container: tailwind`flex p-4`,
    error: tailwind`text-red-600`,
    loginContainer: tailwind`w-9/10`,
    formPwd: tailwind`mb-4`,
    formUsername: tailwind`mb-4`,
    usernameLabel: tailwind`text-lg text-slate-500`,
    pwdLabel: tailwind`text-lg text-slate-500`,
});

export default Login;
