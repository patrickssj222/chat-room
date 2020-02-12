import Cookies from "universal-cookie/es6";

export interface AppState {
    global: GlobalState,
}

export interface GlobalState{
    user: string
    loginError: string
    signUpError: string
}

export const cookies = new Cookies();
