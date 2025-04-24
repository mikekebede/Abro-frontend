'use client'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { X, Image } from "lucide-react";
import imageCompression from 'browser-image-compression';

import {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import PostFilter from './PostFilter'
import { usePostingStore } from '../../store/usePostingStore'
import { useAuthStore } from '../../store/useAuthStore'

interface PostingFormData {
  serviceTitle: string;
  budget?: string;
  deadline: string;
  skills: string;
  location: string;
  fullDescription?: string;
  contactInfo?: string;
  preferredQualifications?: string;
  attachments?: FileList;
}

export async function compressImage(file: File) {
  useEffect(() => {

  }, [])



  const options = {
    maxSizeMB: 1, // Max file size in MB
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
}

const Posting = () => {
  const { addPost, posts, getPosts, isPostsLoading } = usePostingStore();
  const { authUser, checkAuth } = useAuthStore()
  const { register, handleSubmit, reset } = useForm<PostingFormData>();
  const [showMyPosts, setShowMyPosts] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  useEffect(() => {
    checkAuth(); // Call checkAuth on component mount
  }, []);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return
    }

    try {
      // Compress the image before creating preview
      const compressedImage = await compressImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(compressedImage);
    } catch (error) {
      console.error("Error compressing image:", error);
      toast.error("Failed to process image");
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };


  const onSubmit = async (data: PostingFormData) => {
    try {
      const formData: any = {
        serviceTitle: data.serviceTitle,
        budget: data.budget || '',
        deadline: data.deadline,
        skills: data.skills,
        location: data.location,
        fullDescription: data.fullDescription || '',
        contactInfo: data.contactInfo || '',
        preferredQualifications: data.preferredQualifications || '',
        attachments: imagePreview || undefined
      };

      await addPost(formData);
      reset();
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  const filteredPosts = useMemo(() => {
    if (showMyPosts && authUser) {
      return posts.filter((post) => authUser?.email === post.creatorID.email)
    }
    return posts
  }, [authUser, posts, showMyPosts])

  useEffect(() => {
    getPosts();
    console.log(posts)
  }, [getPosts]);

  if (isPostsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col mt-16 h-screen '>

      <div className="flex flex-col items-end mt-4 mr-10">
        <PostFilter
          onFilterChange={(checked) => {
            console.log("Filter changed:", checked);
            setShowMyPosts(checked);
          }}
        />
      </div >

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {filteredPosts.map((post, index) => (
            <Sheet key={post._id || index}>
              <SheetTrigger asChild>
                <div className="w-full">
                  <Card className="m-4 p-4 rounded-lg shadow-sm mb-4 
             bg-gradient-to-r from-[#ffffff] to-[#e7e7e7]
             text-black hover:brightness-110 ease-out duration-300
              w-[400px] h-[247px] overflow-hidden">
                    <CardHeader>
                      <CardTitle>{post.serviceTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <p className="text-base font-medium">Budget:</p>
                        <p className="text-base">{post.budget || "N/A"}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-base font-medium">Skills:</p>
                        <p className="text-base">{post.skills || "N/A"}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-base font-medium">Location:</p>
                        <p className="text-base">{post.location || "N/A"}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-base font-medium">Deadline:</p>
                        <p className="text-base">{post.deadline || "N/A"}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </SheetTrigger>
              <SheetContent className="!max-w-[40vw] w-full transition-all duration-300 ease-in-out">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-semibold">{post.serviceTitle}</SheetTitle>
                  <SheetDescription className="text-base text-muted-foreground">
                    Detailed information about the post.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                  <div className="grid grid-cols-4 items-center gap-6">
                    <Label htmlFor="serviceTitle" className="text-base font-medium text-right">
                      Service Title
                    </Label>
                    <p className="col-span-3 text-base">{post.serviceTitle}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-6">
                    <Label htmlFor="budget" className="text-base font-medium text-right">
                      Budget
                    </Label>
                    <p className="col-span-3 text-base">{post.budget || "N/A"}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-6">
                    <Label htmlFor="deadline" className="text-base font-medium text-right">
                      Deadline
                    </Label>
                    <p className="col-span-3 text-base">{post.deadline}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-6">
                    <Label htmlFor="skills" className="text-base font-medium text-right">
                      Skills
                    </Label>
                    <p className="col-span-3 text-base">{post.skills}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-6">
                    <Label htmlFor="location" className="text-base font-medium text-right">
                      Location
                    </Label>
                    <p className="col-span-3 text-base">{post.location}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-6">
                    <Label htmlFor="fullDescription" className="text-base font-medium text-right">
                      Description
                    </Label>
                    <p className="col-span-3 text-base">{post.fullDescription || "N/A"}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-6">
                    <Label htmlFor="contactInfo" className="text-base font-medium text-right">
                      Contact Info
                    </Label>
                    <p className="col-span-3 text-base">{post.contactInfo || "N/A"}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-6">
                    <Label htmlFor="preferredQualifications" className="text-base font-medium text-right">
                      Qualifications
                    </Label>
                    <p className="col-span-3 text-base">{post.preferredQualifications || "N/A"}</p>
                  </div>
                  {post.attachments && (
                    <div className="grid grid-cols-4 items-center gap-6">
                      <Label htmlFor="attachments" className="text-base font-medium text-right">
                        Attachments
                      </Label>
                      <img
                        src={post.attachments}
                        alt="Attachment"
                        className="col-span-3 w-60 h-60 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="button" variant="default" className="text-base">
                      Close
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="group h-16 w-16 rounded-full hover:w-36 transition-all duration-300 
          bg-black hover:bg-white border-2 border-transparent hover:border-black
          text-white hover:text-black
          flex items-center justify-center overflow-hidden"
            >
              <span className="text-3xl font-bold absolute transition-all duration-300 
          group-hover:opacity-0 group-hover:translate-x-[-100%]">
                +
              </span>
              <span className="text-lg absolute transition-all duration-300 
          opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[100%]
          whitespace-nowrap font-semibold">
                Create Post
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>
                  Fill in the details for your service posting.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Service Title - Required */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="serviceTitle" className="text-right">
                    Service Title*
                  </Label>
                  <Input
                    {...register('serviceTitle', { required: true })}
                    id="serviceTitle"
                    placeholder="Enter service title"
                    className="col-span-3"
                  />
                </div>

                {/* Budget - Optional */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="budget" className="text-right">
                    Budget
                  </Label>
                  <Input
                    {...register('budget', {
                      setValueAs: (v) => v || '', // Empty string if no value
                    })}
                    id="budget"
                    placeholder="Enter budget"
                    maxLength={30} // Limit to 30 characters
                    className="col-span-3"
                  />
                </div>

                {/* Deadline - Required */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deadline" className="text-right">
                    Deadline*
                  </Label>
                  <Input
                    {...register('deadline', { required: true })}
                    id="deadline"
                    type="date"
                    className="col-span-3"
                  />
                </div>

                {/* Skills - Required */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="skills" className="text-right">
                    Skills*
                  </Label>
                  <Input
                    {...register('skills', { required: true })}
                    id="skills"
                    placeholder="Enter required skills"
                    maxLength={30} // Limit to 30 characters
                    className="col-span-3"
                  />
                </div>

                {/* Location - Required */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location*
                  </Label>
                  <Input
                    {...register('location', { required: true })}
                    id="location"
                    placeholder="Enter location"
                    maxLength={30} // Limit to 30 characters
                    className="col-span-3"
                  />
                </div>

                {/* Full Description - Optional */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullDescription" className="text-right">
                    Description
                  </Label>
                  <textarea
                    {...register('fullDescription', {
                      setValueAs: (v) => v || '', // Empty string if no value
                    })}
                    id="fullDescription"
                    placeholder="Enter full description"
                    className="col-span-3 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                {/* Contact Info - Optional */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contactInfo" className="text-right">
                    Contact Info
                  </Label>
                  <Input
                    {...register('contactInfo', {
                      setValueAs: (v) => v || '', // Empty string if no value
                    })}
                    id="contactInfo"
                    placeholder="Enter contact information"
                    className="col-span-3"
                  />
                </div>

                {/* Preferred Qualifications - Optional */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="preferredQualifications" className="text-right">
                    Qualifications
                  </Label>
                  <Input
                    {...register('preferredQualifications', {
                      setValueAs: (v) => v || '', // Empty string if no value
                    })}
                    id="preferredQualifications"
                    placeholder="Enter preferred qualifications"
                    className="col-span-3"
                  />
                </div>
                
              </div>
              <DialogFooter>
                <Button type="submit">Create Post</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}

export default Posting
