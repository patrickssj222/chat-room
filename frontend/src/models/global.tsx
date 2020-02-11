import {Model} from "dva";
import {GlobalState} from "../types"
import {login_check} from "../saga/non-terminal";

export const globalModel:Model = {
    namespace: 'global',
    state: {
        user:null,
        error:null,
        loading: false,
    },
    reducers: {
        set_user(state:GlobalState, action){
            return{
                ...state,
                user: action.payload
            }
        },
        set_error(state:GlobalState, action){
            return {
                ...state,
                error: action.payload
            }
        },
        set_loading(state: GlobalState, action){
            return{
                ...state,
                loading: action.payload
            }
        }
    },
    effects: {
        *saga_check_log_in(action){
            const {username, password} = action.payload;
            yield login_check(username, password);
        },
    },
    subscriptions: {

    }
};




