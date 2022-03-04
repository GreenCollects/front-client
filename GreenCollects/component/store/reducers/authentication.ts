import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import { LOGIN } from "../types";

const AUTH_TOKEN_KEY = 'greencollect-authenticationToken';

// fetch("http://localhost:8080/")

const INITIAL_STATE = {
    token: '',
    login: '',
};

const authentication = (state= INITIAL_STATE, action: any) => {
    switch(action.type) {
        case LOGIN: 
            // TODO : update token
            break;
        default:
            return state
    }
};

export default authentication;