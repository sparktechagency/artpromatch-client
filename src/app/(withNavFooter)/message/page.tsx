'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { BsEmojiSmile } from 'react-icons/bs';
import { IoIosAttach } from 'react-icons/io';
import { AudioOutlined } from '@ant-design/icons';
import { useUser } from '@/context/UserContext';
import { getSocket, initSocket } from '@/utils/socket';
import { AllImages } from '@/assets/images/AllImages';
import { useSearchParams } from 'next/navigation';

interface Message {
  _id: string;
  text: string;
  msgByUser: string;
  seen: boolean;
  createdAt: string;
  conversationId?: string;
}

const MainChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();

  const conversationId = searchParams.get('conversationId') || '';
  const receiverId = searchParams.get('receiverId') || '';

  // ✅ Initialize socket
  useEffect(() => {
    if (!user?.id) return;
    initSocket(user.id);
  }, [user?.id]);

  // ✅ Load messages for existing conversation (if available)
  useEffect(() => {
    if (!user?.id || !conversationId) return;
    const socket = getSocket();
    socket.emit('message-page', { conversationId, page: 1, limit: 20 });

    socket.on('messages', data => {
      console.log({ data });
      setMessages(data.messages || []);
    });

    socket.on('new-message', msg => {
      if (msg.conversationId === conversationId) {
        setMessages(prev => [...prev, msg]);
      }
    });

    socket.on('messages-seen', data => {
      if (data.conversationId === conversationId) {
        setMessages(prev =>
          prev.map(m =>
            data.messageIds.includes(m._id) ? { ...m, seen: true } : m
          )
        );
      }
    });

    return () => {
      socket.off('messages');
      socket.off('new-message');
      socket.off('messages-seen');
    };
  }, [user?.id, conversationId]);

  // ✅ Auto scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ✅ Handle sending message
  const sendMessage = () => {
    if (!newMessage.trim() || !user?.id || !conversationId) return;
    const socket = getSocket();

    if (conversationId) {
      // New chat: backend will create the conversation automatically
      socket.emit('send-message', { receiverId, text: newMessage });
    }

    // else {
    //   // Existing chat
    //   socket.emit('send-message', { conversationId, text: newMessage });
    // }

    setNewMessage('');
  };

  return (
    <div className="flex flex-col w-full px-4 py-2">
      {/* Chat messages area */}
      <div className="flex flex-col gap-3 flex-grow overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Starting a new chat...
          </p>
        )}

        {messages.map(msg => (
          <div
            key={msg._id}
            className={`flex gap-2 ${
              msg.msgByUser === user?.id ? 'justify-end' : ''
            }`}
          >
            {msg.msgByUser !== user?.id && (
              <Image
                src={AllImages.user}
                alt="User"
                className="w-8 h-8 rounded-full"
                width={32}
                height={32}
              />
            )}
            <div
              className={`text-sm px-4 py-2 rounded-lg max-w-xs ${
                msg.msgByUser === user?.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input area */}
      {receiverId && (
        <div className="flex justify-between items-center border rounded-3xl mt-4 pt-2 px-4">
          <div className="flex items-center gap-2 w-[80%]">
            <BsEmojiSmile />
            <input
              type="text"
              placeholder="Type your message here..."
              className="w-full p-2 text-sm border-none outline-none"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
          </div>
          <div className="flex items-center gap-3">
            <AudioOutlined className="text-gray-500 text-lg cursor-pointer" />
            <IoIosAttach />
            <div
              onClick={sendMessage}
              className="bg-primary text-white px-4 py-1.5 rounded-lg cursor-pointer"
            >
              Send
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainChatPage;
