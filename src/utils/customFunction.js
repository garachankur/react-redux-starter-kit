import { toast } from "react-toastify";

export const toaster = (toastType, message) => {
    if (toastType === "success") {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 15000,
        });
    } else if (toastType === "error") {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 15000,
        });
    }
};

export const setUser = data => {
    return window.localStorage.setItem("user", JSON.stringify(data));
};

export const clearLocalStorage = type => {
    return window.localStorage.removeItem(type);
};

export const getUser = () => {
    return JSON.parse(window.localStorage.getItem("user"));
};
