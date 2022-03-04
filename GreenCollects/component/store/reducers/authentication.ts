import { DefaultRootState, useDispatch } from "react-redux";
import { combineReducers } from "redux";
import { LOGIN, LOGOUT } from "../types";

const AUTH_TOKEN_KEY = 'greencollect-authenticationToken';

const INITIAL_STATE = {
    token: '',
    username: '',
};

const authenticationReducer = (state: any = INITIAL_STATE, action: any) => {
    switch(action.type) {
        case LOGIN: 
            console.log(action.value);
            var newState: any = {
                ...state,
                token: action.value.token,
                username: action.value.username
            }
            return newState;
        case LOGOUT:
            var newState: any = INITIAL_STATE
            return newState;
        default:
            return state
    }
};

export default authenticationReducer;