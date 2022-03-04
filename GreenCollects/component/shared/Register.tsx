import { Input, Button } from "@ui-kitten/components";
import { useState } from "react";
import { Alert } from "react-native";
import environment from "../../environment";

const Register = () => {
    var url = environment.SERVER_API_URL + '/api/account/';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');

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
            console.log(response.status);
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

    return (
        <>
            <Input
                placeholder='Username'
                onChangeText={nextValue => setUsername(nextValue)}
            />
            <Input
                placeholder='Email'
                onChangeText={nextValue => setEmail(nextValue)}
            />
            <Input
                placeholder='First Name'
                onChangeText={nextValue => setFirstName(nextValue)}
            />
            <Input
                placeholder='Last Name'
                onChangeText={nextValue => setLastName(nextValue)}
            />
            <Input
                placeholder='Password'
                onChangeText={nextValue => setPassword(nextValue)}
            />
            <Button onPress={() => handleRegister()}>
                Register
            </Button>
        </>
    );
}

export default Register;