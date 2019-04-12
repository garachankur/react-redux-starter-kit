import { SET_USER_PROFILE, SET_LOADER, SET_LOGOUT } from "../actions/types";

const initialState = {
    profile: "",
    loader: false,
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                ...payload,
            };
        case SET_LOADER:
            return {
                ...state,
                loader: payload,
            };
        case SET_LOGOUT:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
};
