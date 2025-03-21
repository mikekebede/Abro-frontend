import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { IUser } from "../types/user"; // Import frontend User type

interface IMessageData{
    text: string;
    image?: File | string | undefined;
    timestamp: Date
}
export const useChatStore = create<{
    messages: any[];
    users: IUser[];
    selectedUser: IUser | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    getUsers: () => Promise<void>;
    getMessages: (userId: string) => Promise<void>;
    sendMessages: (messageData: IMessageData) => Promise<void>;
    setSelectedUser: (selectedUser: IUser | null) => void;
}>((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });

        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
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
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId: string) => {
        set({ isMessagesLoading: true });

        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
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
            set({ isMessagesLoading: false });
        }
    },
    sendMessages: async (messageData: IMessageData) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) {
          toast.error("No user selected.");
          return;
        }
        try {
          const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
          set({ messages: [...messages, res.data] });
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("An unknown error occurred.");
          }
        }
      },
    setSelectedUser: (selectedUser: IUser | null) => set({ selectedUser }),
}));
