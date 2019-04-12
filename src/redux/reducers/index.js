import { combineReducers } from "redux";
import user from "./user";
import { SET_LOGOUT } from "../actions/types";

const combinedReducer = combineReducers({
    user,
});

const rootReducer = (state, action) => {
    if (action.type === SET_LOGOUT) {
        state = undefined;
    }
    return combinedReducer(state, action);
};

export default rootReducer;
