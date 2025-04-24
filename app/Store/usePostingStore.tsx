import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

interface IPostingData {
  serviceTitle: string;
  budget?: string;
  deadline: string;
  skills: string;
  location: string;
  fullDescription?: string;
  contactInfo?: string;
  preferredQualifications?: string;
  attachments?: File;
}

export const usePostingStore = create<{
  posts: any[];
  isPostsLoading: boolean;
  addPost: (data: IPostingData) => Promise<void>;
  getPosts: () => Promise<void>;
}>((set,get) => ({
  posts: [],
  isPostsLoading: false,
  addPost: async (data) => {
    const{posts}=get();
    try {
      const res = await axiosInstance.post("/posts/createPost", data);

      set({ posts: [...posts, res.data] });
      toast.success("Post created successfully");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "Failed to create post");
      } else {
        toast.error("An error occurred while creating the post");
      }
      console.error("Error creating post:", error);
    }
  },
  getPosts: async () => {
    set({ isPostsLoading: true });
    try {
      const res = await axiosInstance.get("/posts");
      set({ posts: res.data });
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "Failed to fetch posts");
      } else {
        toast.error("An error occurred while fetching posts");
      }
      console.error("Error fetching posts:", error);
    }finally {  
      set({ isPostsLoading: false });
    }
  }

}));