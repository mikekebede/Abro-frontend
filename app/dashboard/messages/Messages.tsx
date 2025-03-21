import React from 'react'
import MessageSidebar from './MessageSidebar'
import MessageContainer from './MessageContainer'
import NoChatSelected from './NoChatSelected'
import { useChatStore } from '../../store/useChatStore'

const Posting = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <h1 className="text-xl font-bold">Posting Page</h1>
    </div>
  );
};

const Messages = () => {
  const {selectedUser}= useChatStore()

  return (
<div className="h-full w-full flex items-center justify-center bg-gray-100 pt-16">
<MessageSidebar />
      <div className="flex-1 flex justify-center">
        {!selectedUser ? <NoChatSelected /> : <MessageContainer />}
      </div>
    </div>
  )
}

export default Messages
