import {LOG_IN, LOG_OUT} from "../action-types"
export * from "./account-recovery"
export * from "./award-types"
export * from "./awards"
export * from "./offices"
export * from "./select"
export * from "./users"

export function logIn(token) {
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