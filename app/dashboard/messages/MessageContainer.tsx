import React, { useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useAuthStore } from '../../store/useAuthStore';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage, ChatBubbleTimestamp, ChatBubbleAction, chatBubbleVariant, ChatBubbleActionWrapper, chatBubbleMessageVariants } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';



const MessageContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
    const { authUser, checkAuth } = useAuthStore();

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id);
        }
    }, [selectedUser, getMessages]);

    useEffect(() => {
        const initAuth = async () => {
            await checkAuth();
        };
        initAuth();
    }, [checkAuth]);

    if (isMessagesLoading) return <div>Loading...</div>;
    if (!authUser) {
        console.log("authUser is null");
        return <div>authUser is null</div>;
    }

    return (
        <div className="flex flex-col h-full w-full">
            <div className="border-b border-gray-300">
                <ChatHeader />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
                <ChatMessageList>
                    {messages.map((message, index) => {
                        const variant = message.senderId === authUser._id ? 'sent' : 'received';
                        return (
                            <ChatBubble 
                                // Use combination of senderId and index or message._id if available
                                key={`${message.senderId}-${message._id || index}`} 
                                variant={variant}
                            >
                                <ChatBubbleAvatar 
                                    // Use default avatar or user's avatar if available
                                    fallback={variant === 'sent' ? authUser.fullName?.charAt(0) || 'U' : selectedUser?.fullName?.charAt(0) || 'O'} 
                                />
                                <ChatBubbleMessage isLoading={message.isLoading}>
                                    {message.text}
                                </ChatBubbleMessage>
                            </ChatBubble>
                        );
                    })}
                </ChatMessageList>
            </div>
            <div>
                <MessageInput />
            </div>
        </div>
    );
};
export default MessageContainer;
