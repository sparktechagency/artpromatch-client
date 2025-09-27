'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { AudioOutlined } from '@ant-design/icons';
import { IoIosAttach } from 'react-icons/io';
import { BsEmojiSmile } from 'react-icons/bs';
import { useUser } from '@/context/UserContext';
import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';

let socket: Socket;

const MainChatPage = ({ conversationId }: { conversationId: string }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    socket = io(process.env.NEXT_PUBLIC_MAIN_API, {
      query: { id: user?.id },
    });

    socket.on('receive_message', (msg: any) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

  useEffect(() => {
    // scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msgData = {
      conversationId,
      text: newMessage,
      sender: user?.id,
    };

    socket.emit('send_message', msgData);
    setNewMessage('');
    setMessages(prev => [...prev, msgData]); // add locally
  };

  return (
    <div>
      <div className="flex flex-col w-full px-4 py-2">
        <p className="text-center text-xs text-gray-500 my-2">
          Mon 9 Dec 12:12 PM
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Image
                className="w-8 h-8 rounded-full"
                src={AllImages.user}
                alt="User"
              />
              <div className="text-sm px-4 py-2 rounded-lg max-w-xs bg-gray-100 text-gray-900">
                Hey, this is a demo message text. I&apos;m writing to check the
                responsiveness of this message box
              </div>
            </div>
            <div className="flex gap-1 text-xs text-gray-400 pl-10">
              {/* <span>✔✔</span> */}
              <p>1:15 PM</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-end">
            <div className="flex gap-2">
              <div className="text-sm px-4 py-2 rounded-lg max-w-xs bg-black text-white">
                Hey, This is a demo message text.
              </div>
              <Image
                className="w-8 h-8 rounded-full"
                src={AllImages.user}
                alt="User"
              />
            </div>
            <div className="flex gap-1 text-xs text-gray-400">
              <span>✔✔</span>
              <p>1:15 PM</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border rounded-3xl mt-20 md:mt-80 pt-2 px-4">
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
              className="bg-primary text-white px-4 py-1.5 rounded-lg"
            >
              Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChatPage;
