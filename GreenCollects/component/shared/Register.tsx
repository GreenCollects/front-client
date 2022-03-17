import { Input, Button, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import tailwind from "twrnc";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { EyeIcon, EyeOffIcon } from "../icons/icons";
import { register } from "../api/account";
import Toast from "react-native-root-toast";

const Register = (props: any) => {
    const [username, setUsername] = useState("");
    const [usernameErr, setUsernameErr] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [passwordSecureText, setPasswordSecureText] = useState(true);
    const [reapeatPassword, setReapeatPassword] = useState("");
    const [reapeatPasswordErr, setReapeatPasswordErr] = useState("");
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [first_name, setFirstName] = useState("");
    const [first_nameErr, setFirstNameErr] = useState("");
    const [last_name, setLastName] = useState("");
    const [last_nameErr, setLastNameErr] = useState("");
    const [formValidated, setFormValidated] = useState(false);

    const USR_NAME_MIN_LENGTH = 1;
    const PWD_MIN_LENGTH = 5;
    const EMAIL_REGEX_CHECK =
        /^[A-Za-zÀ-ÿ0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-zÀ-ÿ0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-zÀ-ÿ0-9](?:[A-Za-zÀ-ÿ0-9-]*[A-Za-zÀ-ÿ0-9])?\.)+(?:[a-zA-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b$/;

    useEffect(() => {
        if (
            !usernameErr &&
            !passwordErr &&
            !reapeatPasswordErr &&
            !emailErr &&
            !first_nameErr &&
            !last_nameErr
        ) {
            setFormValidated(true);
        } else {
            setFormValidated(false);
        }
    }, [
        usernameErr,
        passwordErr,
        reapeatPasswordErr,
        emailErr,
        first_nameErr,
        last_nameErr,
    ]);

    const handleRegister = () => {
        const doRegister = async () => {
            const headers = new Headers();
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");

            const body = JSON.stringify({
                username: username,
                password: password,
                email: email,
                first_name: first_name,
                last_name: last_name,
            });

            const data: any = await register(headers, body);

            if (data !== undefined) {
                Toast.show("Compte créé avec succès !", {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: "#54e096",
                    textColor: "#fff",
                });

                props.navigation.navigate("Connexion");
            }
        };

        doRegister().catch((err) => console.log(err));
    };

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
        } else if (newValue !== reapeatPassword) {
            setPasswordErr("");
            handleRepeatPasswordFieldChange("");
        } else {
            setPasswordErr("");
        }

        setPassword(newValue);
    };

    const handleRepeatPasswordFieldChange = (newValue: string) => {
        if (newValue !== password) {
            setReapeatPasswordErr(
                "Repeated password does not match the password"
            );
        } else {
            setReapeatPasswordErr("");
        }

        setReapeatPassword(newValue);
    };

    const handleEmailFieldChange = (newValue: string) => {
        if (!EMAIL_REGEX_CHECK.test(newValue)) {
            setEmailErr("Email does not match the right pattern");
        } else {
            setEmailErr("");
        }

        setEmail(newValue);
    };

    const handleFirstNameFieldChange = (newValue: string) => {
        if (newValue.length < USR_NAME_MIN_LENGTH) {
            setFirstNameErr(
                `Username to short (min ${USR_NAME_MIN_LENGTH} character)`
            );
        } else {
            setFirstNameErr("");
        }

        setFirstName(newValue);
    };

    const handleLastNameFieldChange = (newValue: string) => {
        if (newValue.length < USR_NAME_MIN_LENGTH) {
            setLastNameErr(
                `Username to short (min ${USR_NAME_MIN_LENGTH} character)`
            );
        } else {
            setLastNameErr("");
        }

        setLastName(newValue);
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
        <ScrollView style={styles.viewContainer}> 
            <View style={styles.container}>
                <Text style={styles.title}>
                    S'inscrire
                </Text>

                <View>
                    <View style={styles.usernameForm}>
                        <Text style={styles.usernameLabel}>Nom d'utilisateur</Text>      
                        <Input
                            placeholder="Nom d'utilisateur"
                            onChangeText={nextValue => handleUsernameFieldChange(nextValue)}
                            status={renderStatus(usernameErr)}
                            autoCapitalize="none"
                        />
                        <Text style={styles.error}>{usernameErr}</Text>
                    </View>

                    <View style={styles.emailForm}>  
                        <Text style={styles.emailLabel}>
                            Email
                        </Text>
                        <Input
                            placeholder='Email'
                            onChangeText={nextValue => handleEmailFieldChange(nextValue)}
                            status={renderStatus(emailErr)}
                            autoCapitalize="none"
                        />
                        <Text style={styles.error}>{emailErr}</Text>
                    </View>

                    <View style={styles.firstNameForm}> 
                        <Text style={styles.firstNameLabel}>Prénom</Text>
                        <Input
                            placeholder='Prénom'
                            onChangeText={nextValue => handleFirstNameFieldChange(nextValue)}
                            status={renderStatus(first_nameErr)}
                        />
                        <Text style={styles.error}>{first_nameErr}</Text>
                    </View>

                    <View style={styles.lastNameForm}> 
                        <Text style={styles.lastNameLabel}>Nom</Text>           
                        <Input
                            placeholder='Nom'
                            onChangeText={nextValue => handleLastNameFieldChange(nextValue)}
                            status={renderStatus(last_nameErr)}
                        />
                        <Text style={styles.error}>{last_nameErr}</Text>
                    </View>

                    <View style={styles.pwdForm}>
                        <Text style={styles.pwdLabel}>
                            Mot de passe
                        </Text>
                        <Input
                            value={password}
                            placeholder='Mot de passe'
                            onChangeText={nextValue => handlePasswordFieldChange(nextValue)}
                            status={renderStatus(passwordErr)}
                            secureTextEntry={passwordSecureText}
                            accessoryRight={renderIcon}
                        />
                        <Text style={styles.error}>{passwordErr}</Text>
                    </View>

                    <View style={styles.confirmPwdForm}>
                        <Text style={styles.confirmPwdLabel}>Confirmer le mot de passe</Text>
                        <Input
                            value={reapeatPassword}
                            placeholder='Confirmer le mot de passe'
                            onChangeText={nextValue => handleRepeatPasswordFieldChange(nextValue)}
                            status={renderStatus(reapeatPasswordErr)}
                            secureTextEntry={true}
                        />
                        <Text style={styles.error}>{reapeatPasswordErr}</Text>
                    </View>

                    <View>
                        <Button 
                            disabled={!formValidated}
                            onPress={() => handleRegister()}
                        >
                            Register
                        </Button>
                    </View>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    viewContainer: tailwind`flex flex-1 bg-white`,
    title: tailwind`text-center text-3xl mb-4 text-slate-500`,
    container: tailwind`flex p-4`,
    error: tailwind`text-red-600`,
    usernameForm : tailwind`mb-2`,
    emailForm: tailwind`mb-2`,
    firstNameForm : tailwind`mb-2`,
    lastNameForm : tailwind`mb-2`,
    pwdForm : tailwind`mb-2`,
    confirmPwdForm : tailwind`mb-2`,
    usernameLabel : tailwind`text-lg text-slate-500`,
    emailLabel : tailwind`text-lg text-slate-500`,
    firstNameLabel : tailwind`text-lg text-slate-500`,
    lastNameLabel : tailwind`text-lg text-slate-500`,
    pwdLabel : tailwind`text-lg text-slate-500`,
    confirmPwdLabel : tailwind`text-lg text-slate-500`,

});

export default Register;
