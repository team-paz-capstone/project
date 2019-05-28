import {LOG_IN, LOG_OUT} from "../action-types";

const initialState = {
    auth: true,
    token: ''
};

export default function (state = initialState, action) {
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

