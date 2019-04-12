import { SET_USER_PROFILE, SET_LOADER, SET_LOGOUT } from "./types";

export const updateUserProfile = payload => {
    return {
        type: SET_USER_PROFILE,
        payload,
    };
};

export const isLoading = payload => {
    return {
        type: SET_LOADER,
        payload,
    };
};

export const isLogout = payload => {
    return {
        type: SET_LOGOUT,
        payload,
    };
};
