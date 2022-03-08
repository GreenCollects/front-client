import { Input, Button, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import environment from "../../environment";
import tailwind from "twrnc";
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { EyeIcon, EyeOffIcon } from "../icons/icons";

const Register = (props:any) => {

    var url = environment.SERVER_API_URL + '/api/account/';

    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [passwordSecureText, setPasswordSecureText] = useState(true);
    const [reapeatPassword, setReapeatPassword] = useState('');
    const [reapeatPasswordErr, setReapeatPasswordErr] = useState('');
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [first_name, setFirstName] = useState('');
    const [first_nameErr, setFirstNameErr] = useState('');
    const [last_name, setLastName] = useState('');
    const [last_nameErr, setLastNameErr] = useState('');
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
    }, [usernameErr, passwordErr, reapeatPasswordErr, emailErr, first_nameErr, last_nameErr]);

    const handleRegister = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "email": email,
                "first_name": first_name,
                "last_name": last_name
            })
        }).then(function(response) {
            if (response.ok){
                props.navigation.navigate("Connexion");
            }
        }).catch(err => {
            Alert.alert(
                "Error : Register",
                err.message,
                [
                    {text: "Cancel", style: "cancel"},
                    { text: "OK"}
                ]
            );
        });
    };

    const handleUsernameFieldChange = (newValue: string) => {
        if (newValue.length < USR_NAME_MIN_LENGTH){
            setUsernameErr(`Username to short (min ${USR_NAME_MIN_LENGTH} character)`)
        }else{
            setUsernameErr('');
        }

        setUsername(newValue);
    }

    const handlePasswordFieldChange = (newValue: string) => {
        if (newValue.length < PWD_MIN_LENGTH){
            setPasswordErr(`Password to short (min ${PWD_MIN_LENGTH} character)`);
        } else if (newValue !== reapeatPassword) {
            setPasswordErr('');
            handleRepeatPasswordFieldChange('');
        } else{
            setPasswordErr('');
        }

        setPassword(newValue);
    }

    const handleRepeatPasswordFieldChange = (newValue: string) => {
        if (newValue !== password){
            setReapeatPasswordErr('Repeated password does not match the password')
        }else{
            setReapeatPasswordErr('');
        }

        setReapeatPassword(newValue);
    }

    const handleEmailFieldChange = (newValue: string) => {
        if (!EMAIL_REGEX_CHECK.test(newValue)){
            setEmailErr('Email does not match the right pattern')
        }else{
            setEmailErr('');
        }

        setEmail(newValue);
    }

    const handleFirstNameFieldChange = (newValue: string) => {
        if (newValue.length < USR_NAME_MIN_LENGTH){
            setFirstNameErr(`Username to short (min ${USR_NAME_MIN_LENGTH} character)`)
        }else{
            setFirstNameErr('');
        }

        setFirstName(newValue);
    }
    
    const handleLastNameFieldChange = (newValue: string) => {
        if (newValue.length < USR_NAME_MIN_LENGTH){
            setLastNameErr(`Username to short (min ${USR_NAME_MIN_LENGTH} character)`)
        }else{
            setLastNameErr('');
        }

        setLastName(newValue);
    }

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
        <>
            <Input
                placeholder='Username'
                onChangeText={nextValue => handleUsernameFieldChange(nextValue)}
                status={renderStatus(usernameErr)}
            />
            <Text style={styles.error}>{usernameErr}</Text>

            <Input
                placeholder='Email'
                onChangeText={nextValue => handleEmailFieldChange(nextValue)}
                status={renderStatus(emailErr)}
            />
            <Text style={styles.error}>{emailErr}</Text>

            <Input
                placeholder='First Name'
                onChangeText={nextValue => handleFirstNameFieldChange(nextValue)}
                status={renderStatus(first_nameErr)}
            />
            <Text style={styles.error}>{first_nameErr}</Text>

            <Input
                placeholder='Last Name'
                onChangeText={nextValue => handleLastNameFieldChange(nextValue)}
                status={renderStatus(last_nameErr)}
            />
            <Text style={styles.error}>{last_nameErr}</Text>

            <Input
                value={password}
                placeholder='Password'
                onChangeText={nextValue => handlePasswordFieldChange(nextValue)}
                status={renderStatus(passwordErr)}
                secureTextEntry={passwordSecureText}
                accessoryRight={renderIcon}
            />
            <Text style={styles.error}>{passwordErr}</Text>

            <Input
                value={reapeatPassword}
                placeholder='Repeat password'
                onChangeText={nextValue => handleRepeatPasswordFieldChange(nextValue)}
                status={renderStatus(reapeatPasswordErr)}
                secureTextEntry={true}
            />
            <Text style={styles.error}>{reapeatPasswordErr}</Text>

            <Button 
                disabled={!formValidated}
                onPress={() => handleRegister()}
            >
                Register
            </Button>
        </>
    );
}

const styles = StyleSheet.create({
    error: tailwind`text-red-600`,
});

export default Register;