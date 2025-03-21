import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

interface AuthUser {
    _id: string;
    fullName: string;
    email: string;
    profilePic?: string;
}
interface signupData {
    fullName: string;
    email: string;
    password: string;
}
interface loginData{
    email:string;
    password:string;
}

interface updateProfileData{
    image:string;
}

interface AuthStore {
    authUser: AuthUser | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    onlineUsers:string[],
    checkAuth: () => Promise<void>;
    register:(data: signupData) => Promise<void>;
    login:(data:loginData)=>Promise<void>;

}
export const useAuthStore = create<AuthStore>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],
    
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data })
        } catch (error) {
            console.log("error in checkAuth : ", error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    register: async (data: signupData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);
            toast.success("Account created successfully!")
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
    login: async (data:loginData) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");

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
    updateProfile: async(data:updateProfileData)=>{

    }
    
}))
