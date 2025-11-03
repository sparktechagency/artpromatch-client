'use client';

import { useEffect, useState, useCallback } from 'react';
import { ConfigProvider, Drawer } from 'antd';
import { FaUsers } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import LeftSideBar from '@/components/WithNavFooterComponents/Profile/Message/LeftSideBar';
import { initSocket, getSocket } from '@/utils/socket';
import { useUser } from '@/context/UserContext';

interface Conversation {
  conversationId: string;
  unseenMsg: number;
  userData: {
    userId: string;
    name: string;
    profileImage?: string;
    online?: boolean;
  };
  lastMsg: string;
  lastMsgCreatedAt: string;
}

const MessageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { user } = useUser();

  // ✅ Request updated conversations from backend
  const fetchConversations = useCallback(() => {
    try {
      const socket = getSocket();
      socket.emit('get-conversations', {});
    } catch {
      console.warn('Socket not ready yet.');
    }
  }, []);

  // ✅ Initialize socket and listen for conversation events
  useEffect(() => {
    if (!user?.id) return;

    const socket = initSocket(user.id);

    socket.on('connect', () => {
      socket.emit('get-conversations');
    });

    socket.on('conversation-list', data => {
      setConversations(data?.conversations || []);
    });

    socket.on('new-message', fetchConversations);
    socket.on('conversation-created', fetchConversations);
    socket.on('socket-error', err =>
      console.error('Socket error:', err.message || err)
    );

    return () => {
      socket.off('connect');
      socket.off('conversation-list');
      socket.off('new-message');
      socket.off('conversation-created');
      socket.off('socket-error');
    };
  }, [user?.id, fetchConversations]);

  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  return (
    <div className="container mx-auto px-2 md:h-[80vh] flex flex-col lg:flex-row mb-10 border border-neutral-400">
      {/* Mobile Drawer Button */}
      <div className="flex lg:hidden justify-start p-2">
        <FaUsers
          className="text-2xl cursor-pointer h-10 w-10"
          onClick={showDrawer}
        />
      </div>

      {/* Sidebar on Desktop */}
      <div className="hidden lg:block w-[30%] border-r border-neutral-400">
        <LeftSideBar conversations={conversations} />
      </div>

      {/* Drawer for Mobile */}
      <ConfigProvider theme={{ components: { Drawer: { paddingXS: 30 } } }}>
        <Drawer
          title="Chat List"
          placement="left"
          onClose={closeDrawer}
          open={isDrawerVisible}
          width="80%"
          closeIcon={<FaX className="text-black " />}
        >
          <LeftSideBar conversations={conversations} />
        </Drawer>
      </ConfigProvider>

      {/* Main Chat Area */}
      <div className="w-full lg:w-[70%] p-6">{children}</div>
    </div>
  );
};

export default MessageLayout;
