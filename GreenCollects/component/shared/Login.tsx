import { Button } from "@ui-kitten/components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import environment from "../../environment";
import login from "../store/reducers/authentication"

const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('dodo');
    const [password, setPassword] = useState('dorian');

    var url = environment.SERVER_API_URL + '/api/account/';

    const handleLogin = () => {
        console.log("handleLogin");

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
            console.log(response.status);
            // console.log(response.);
            // dispatch({type: 'login', value: {username: 'dodo', password: 'dorian'}});
        });
    };

    const handleLogout = () => {
        console.log("handleLogin");

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
            console.log(response.status);
            // console.log(response.);
            // dispatch({type: 'login', value: {username: 'dodo', password: 'dorian'}});
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

    return (
        <>
            <Button onPress={() => handleLogin()}>
                Login
            </Button>
            <Button onPress={() => handleCreate()}>
                Create account
            </Button>
            <Button onPress={() => handleLogout()}>
                Disconnect
            </Button>
        </>
    );
};

export default Login;