import { useDispatch } from "react-redux";
import { combineReducers } from "redux";

const AUTH_TOKEN_KEY = 'greencollect-authenticationToken';

// fetch("http://localhost:8080/")

const INITIAL_STATE = {
    token: '',
    login: '',
};

const dispatch = useDispatch()

const login = (username: string, password: string) => {
    fetch('http://localhost:8080/api/authenticate', {
        method: 'GET',
    }).then(function(response) {
        console.log(response.status)
        console.log(response.body)
    })
    dispatch({type: 'login', value: {username: 'dodo', password: ''}})
};

const authentication = (state= INITIAL_STATE, action: any) => {
    switch(action.type) {
        case 'login': 
            login("dodo", "dorian");
            break;
        default:
            return state
    }
};

export default authentication;