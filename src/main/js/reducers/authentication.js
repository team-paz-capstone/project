import {LOG_IN, LOG_OUT} from "../action-types";

const initialState = {
    auth: false,
    token: ''
};

export default function (state = initialState, action) {
    console.debug(action);
    switch (action.type) {
        case LOG_IN:
            return {
                auth: true,
                token: action.token
            };
        case LOG_OUT:
            return {
                auth: false,
                token: undefined
            };
        default:
            return state;
    }
};

