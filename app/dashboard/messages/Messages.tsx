import React from 'react'
import MessageSidebar from './MessageSidebar'
import MessageContainer from './MessageContainer'
import NoChatSelected from './NoChatSelected'
import { useChatStore } from '../../store/useChatStore'

const Messages = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className="h-full w-full flex justify-center bg-gray-100 pt-16">
      <MessageSidebar />
      <div className="flex-1 flex justify-center">
        {!selectedUser ? <NoChatSelected /> : <MessageContainer />}
      </div>
    </div>
  )
}

export default Messages
