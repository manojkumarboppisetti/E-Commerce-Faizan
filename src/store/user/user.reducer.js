import {USER_ACTION_TYPES} from "./user.types";

export const INITIAL_STATE={
    currentUser: null,
    isCheckLoginUnderProgress:false,
    error:null
};

export const userReducer=(state=INITIAL_STATE,action)=>{

    const {type,payload}=action;

    switch (type){
        case USER_ACTION_TYPES.CHECK_USER_SESSION:
            return{
                ...state,
                isCheckLoginUnderProgress: true
            }
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS :
            return{
                ...state,
                currentUser: payload,
                isCheckLoginUnderProgress: false
            };
        case USER_ACTION_TYPES.SIGN_IN_FAILED :
            return {
                ...state,
                error:payload,
                isCheckLoginUnderProgress: false
            };
        case USER_ACTION_TYPES.SET_USERNAME:
            return{
                ...state,
                currentUser: payload
            }
        default:
            return state;
    }
};

