// frontend/src/store/useAuthStore.js

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from 'react-hot-toast';

const handleError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
    } else if (error.code === 'ERR_NETWORK') {
        toast.error("Network error. Please check your connection.");
    } else {
        toast.error("An error occurred");
    }
};

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
            handleError(error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            return res; // Return the response object
        } catch (error) {
            handleError(error);
            throw error; // Throw the error
        } finally {
            set({ isSigningUp: false });
        }
    },

    subscribe: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/subscribe", data);
            set({ authUser: res.data });
            toast.success("Subscribed successfully");

            get().connectSocket();
        } catch (error) {
            handleError(error);
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            handleError(error);
            toast.error(error.response.data.message);
        }
    },
}));