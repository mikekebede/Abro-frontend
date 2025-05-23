import React from 'react'
import { useEffect, useState } from 'react'
import { useCommunityStore } from '../../store/useCommunityStore'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useRouter } from 'next/navigation';
import { useChatStore } from '../../store/useChatStore';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Fuse from 'fuse.js'
import { Input } from "@/components/ui/input"
import { useAuthStore } from '../../store/useAuthStore'

interface CommunityUser {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string | null;
  shortDescription: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}
const Community = () => {
  const { community, isCommunityLoading, getCommunity } = useCommunityStore()
  const router = useRouter();
  const { setSelectedUser } = useChatStore();
  const {authUser}=useAuthStore()
  const [query, setQuery] = useState('')
  const fuse = new Fuse(community, {
    keys: [
      "fullName",
      "email",
      "skills"
    ],
    threshold: 0.3,
  })
  const searchResults = fuse.search(query)
  const userCommunitySearch = query ? searchResults.map((result) => result.item) : community

  const handleOnSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    getCommunity()
  }, [])
  return (
    <div className='flex flex-col h-screen mt-20'>
      <div className='flex items-center justify-center pt-4 pb-6'>
        <Input
          placeholder="Search your Community"
          value={query}
          onChange={handleOnSearch}
          className="w-[90%] max-w-md mx-auto border-black" // This makes the input responsive
        />
      </div>
      <div className="flex flex-wrap justify-center gap-12 max-w-7xl mx-auto">
        {userCommunitySearch.map((userCommunity: CommunityUser, index: number) => (
          <HoverCard key={index} openDelay={150}>
            <HoverCardTrigger>
              <div  className='flex flex-col items-center
                transform transition-all duration-300 ease-in-out
                 hover:scale-110 cursor-pointer'>
                <Avatar className="size-40 mx-auto">
                  <AvatarImage src={userCommunity.profilePic || "/avatar.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className='pt-2 text-sm font-helvetica'>{userCommunity.fullName}</p>
              </div></HoverCardTrigger>
            <HoverCardContent className='border-black bg-white text-black w-80 p-4 rounded-lg shadow-lg'>
            <div className='flex flex-col gap-4'>
    <div className="flex items-center gap-4">
      <div>
        <h3 className='text-lg font-bold'>{userCommunity.fullName}</h3>
        <p className='text-sm text-gray-500'>{userCommunity.email}</p>
      </div>
    </div>

    <div className="space-y-3">
      <div>
        <p className='text-sm leading-relaxed'>{userCommunity.shortDescription}</p>
      </div>

      <div>
        <p className='font-semibold mb-2'>Skills:</p>
        <div className="flex flex-wrap gap-2">
          {userCommunity.skills.map((skill, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Member since {new Date(userCommunity.createdAt).toLocaleDateString()}
      </div>
    </div>
  </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  )
}

export default Community
