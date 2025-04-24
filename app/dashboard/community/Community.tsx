import React from 'react'
import { useEffect, useState } from 'react'
import { useCommunityStore } from '../../store/useCommunityStore'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import Fuse from 'fuse.js'
import { Input } from "@/components/ui/input"
import { useAuthStore } from '../../store/useAuthStore'

interface CommunityUser {
  fullName: string;
  email: string;
  profilePic: string | null;
  // Add other properties that exist in your community user object
}
const Community = () => {
  const { community, isCommunityLoading, getCommunity } = useCommunityStore()
  const {authUser}=useAuthStore()
  const [query, setQuery] = useState('')
  const fuse = new Fuse(community, {
    keys: [
      "fullName",
      "email",
    ]
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
              The React Framework – created and maintained by @vercel.
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  )
}

export default Community
