import {LOG_IN, LOG_OUT} from "../action-types"
export * from "./users"

export function logIn(token) {
    // TODO: api fetch instead
    return {
        type: LOG_IN,
        token
    }
}

export function logOut() {
    return {
        type: LOG_OUT,
        token: ''
    }
}