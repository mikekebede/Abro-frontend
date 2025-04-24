import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { io, Socket } from "socket.io-client";

const BASEURL = "http://localhost:5000";
interface AuthUser {
    _id: string;
    fullName: string;
    email: string;
    profilePic?: string;
    createdAt: string;
}
interface signupData {
    fullName: string;
    email: string;
    password: string;
}
interface loginData {
    email: string;
    password: string;
}
interface userInfoData{
    skills: string[];
    description: string;
    profilePic: string;
}

interface updateProfileData {
    //image: string;
}

interface AuthStore {
    authUser: AuthUser | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    onlineUsers: string[];
    socket: Socket | null;
    checkAuth: () => Promise<void>;
    register: (data: signupData) => Promise<void>;
    login: (data: loginData) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (data: updateProfileData) => Promise<void>;
    connectSocket: () => void;
    disconnectSocket: () => void;

}
export const useAuthStore = create<AuthStore>((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data })
            get().connectSocket();
        } catch (error: any) { // Change unknown to any for axios error typing
            console.log("error in checkAuth : ", error);
            if (error.response?.status === 401) {
                // Do not show an error toast if the user is expected to be logged out
                set({ authUser: null });
            } else {
                set({ authUser: null });
                // Optionally handle other error cases
                toast.error("Authentication check failed");
            }
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    register: async (data: signupData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);
            toast.success("Account created successfully!")
            get().connectSocket();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else if (
                typeof error === "object" &&
                error !== null &&
                "response" in error
            ) {
                toast.error((error as any).response.data.message || "Signup failed!");
            } else {
                toast.error("An unknown error occurred.");
            }
        } finally {
            set({ isSigningUp: false })
        }

    },
    login: async (data: loginData) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            get().connectSocket();

        } catch (error) {
            if (error instanceof Error) {
                toast.error("Invalid email or password. Please try again.");
            } else if (
                typeof error === "object" &&
                error !== null &&
                "response" in error
            ) {
                toast.error((error as any).response?.data?.message || "Invalid email or password. Please try again.");
            } else {
                toast.error("An unknown error occurred.");
            }
        } finally {
            console.log()
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            get().disconnectSocket();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else if (
                typeof error === "object" &&
                error !== null &&
                "response" in error
            ) {
                toast.error((error as any).response.data.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        }

    },
    updateProfile: async (data: updateProfileData) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else if (
                typeof error === "object" &&
                error !== null &&
                "response" in error
            ) {
                toast.error((error as any).response.data.message || "Signup failed!");
            } else {
                toast.error("An unknown error occurred.");
            }
        } finally {
          set({ isUpdatingProfile: false });
        }
    },
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        const newSocket = io(BASEURL, {
            query: {
                userId: authUser._id
            }
    });
        newSocket.connect();
        set({ socket: newSocket });
        newSocket.on("getOnlineUsers", (userIds: string[]) => {
            set({ onlineUsers: userIds });
        });

    },
    disconnectSocket: () => {
        const socket = get().socket;
        if (socket && socket.connected) {
            socket.disconnect();
        }
    },
    addUserInfo: (userId: string) => {

    }

}))
