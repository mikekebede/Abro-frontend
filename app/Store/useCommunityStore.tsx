import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useCommunityStore = create<{
    community:any[];
    isCommunityLoading: boolean;
    getCommunity: () => Promise<void>;
}>((set,get) => ({  
    community: [],
    isCommunityLoading: false,
    getCommunity: async () => {
        set({ isCommunityLoading: true });
        try {
            const res = await axiosInstance.get("/community");
            console.log(res.data);
            set({ community: res.data });
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else if (
                typeof error === "object" &&
                error !== null &&
                "response" in error &&
                typeof (error as any).response?.data?.message === "string"
            ) {
                toast.error((error as any).response.data.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        } finally {
            set({ isCommunityLoading: false });
        }
    },
}));