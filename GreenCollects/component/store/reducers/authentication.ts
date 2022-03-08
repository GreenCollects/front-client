import { LOGIN, LOGOUT, PROFIL } from "../types";

const INITIAL_STATE = {
    token: '',
    user: {
        username: '',
        email: '',
        first_name: '',
        last_name: ''
    }
};

const authenticationReducer = (state: any = INITIAL_STATE, action: any) => {
    switch(action.type) {
        case LOGIN: 
            var newState: any = {
                ...state,
                token: action.value.token,
                user: {
                    username: action.value.username
                }
            }
            return newState;
        case LOGOUT:
            var newState: any = INITIAL_STATE
            return newState;
        case PROFIL:
            var newState: any = {
                ...state,
                user: action.value.user
            }
            return newState;
        default:
            return state
    }
};

export default authenticationReducer;