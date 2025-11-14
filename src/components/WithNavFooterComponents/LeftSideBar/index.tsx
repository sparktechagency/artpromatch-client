'use client';

import { BiEdit } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { initSocket } from '@/utils/socket';
import { getUserForConversation } from '@/services/Auth';
import { useRouter } from 'next/navigation';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';

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

interface UserSearch {
  _id: string;
  fullName: string;
  image?: string;
}

const LeftSideBar = ({
  conversations = [],
  activeConversationId = '',
}: {
  conversations: Conversation[];
  activeConversationId?: string;
}) => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<UserSearch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  // 🔹 Ensure socket stays active (useful when sidebar mounts separately)
  useEffect(() => {
    if (!user?.id) return;
    initSocket(user.id);
  }, [user?.id]);

  // 🔹 Search user by name or email
  const handleSearchUser = async () => {
    if (!searchTerm.trim()) return;
    try {
      setIsLoading(true);
      const res = await getUserForConversation(searchTerm);
      setSearchResults(res?.data || []);
    } catch (err) {
      console.error('User search failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Start new chat (sends a first “hello” message)
  const startConversation = async (userData: UserSearch) => {
    try {
      setIsModalOpen(false);
      setSearchResults([]);
      setSearchTerm('');
      router.push(
        `/message?receiverId=${userData._id}&receiverName=${encodeURIComponent(
          userData.fullName
        )}&receiverImage=${encodeURIComponent(userData.image || '')}`
      );
    } catch (err) {
      console.error('Failed to start conversation:', err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center gap-2 border-0 border-b mb-5 pb-5">
        <h1 className="text-2xl font-bold">Messages</h1>
        <BiEdit
          onClick={() => setIsModalOpen(true)}
          className="text-3xl cursor-pointer"
        />
      </div>

      {/* Unread count */}
      <p className="text-secondary mb-3">
        Unread ({conversations.filter(c => c.unseenMsg > 0).length})
      </p>

      {/* Conversations */}
      {conversations.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No conversations yet</p>
      ) : (
        conversations.map((conversation, index) => (
          <Link
            key={index}
            // href={`/message/?receiverId=${conv.conversationId}`}
            href={`/message?conversationId=${conversation?.conversationId}&receiverId=${conversation?.userData?.userId}`}
            className={`flex justify-between items-center text-textColor mb-5 px-5 py-2 transition-colors rounded-xl border
              ${
                conversation.conversationId === activeConversationId
                  ? 'bg-blue-100 border-primary/30 shadow-sm'
                  : 'border-transparent hover:bg-blue-100'
              }`}
          >
            <div className="flex justify-start items-center gap-2">
              <div className="relative">
                <Image
                  className="w-12 h-12 rounded-full object-cover"
                  src={getCleanImageUrl(conversation?.userData?.profileImage)}
                  alt={conversation?.userData?.name}
                  width={40}
                  height={40}
                />
                {conversation?.userData?.online && (
                  <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <h3
                  className={`text-xl font-semibold ${
                    conversation.conversationId === activeConversationId
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  {conversation?.userData?.name}
                </h3>
                <p
                  className={`text-sm truncate max-w-[160px] ${
                    conversation.conversationId === activeConversationId
                      ? 'text-gray-600'
                      : 'text-secondary'
                  }`}
                >
                  {conversation.lastMsg || 'No messages yet'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-secondary text-sm">
                {conversation?.lastMsgCreatedAt
                  ? new Date(conversation.lastMsgCreatedAt).toLocaleDateString(
                      [],
                      {
                        month: 'short',
                        day: 'numeric',
                      }
                    )
                  : ''}
              </p>
              {conversation?.unseenMsg > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {conversation?.unseenMsg}
                </span>
              )}
            </div>
          </Link>
        ))
      )}

      {/* Modal for new chat */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="Search User for New Message"
      >
        <div className="flex flex-col gap-2 mt-4">
          <input
            type="text"
            placeholder="Search users by name or email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearchUser()}
          />
        </div>

        {isLoading ? (
          <div className="text-center mt-5">
            <Spin /> <p>Loading users...</p>
          </div>
        ) : searchResults.length === 0 && searchTerm ? (
          <p className="text-center text-gray-500 mt-5">No users found</p>
        ) : (
          searchResults.map(user => (
            <div
              key={user._id}
              onClick={() => startConversation(user)}
              className="flex justify-between items-center text-textColor my-5 px-5 py-1 cursor-pointer bg-gray-200 hover:bg-blue-200 transition-colors rounded-lg"
            >
              <div className="flex justify-start items-center gap-2">
                <Image
                  className="w-12 h-12 rounded-full object-cover"
                  src={getCleanImageUrl(user.image)}
                  alt={user.fullName}
                  width={40}
                  height={40}
                />
                <div>
                  <h3 className="text-xl font-semibold text-black">
                    {user.fullName}
                  </h3>
                  <p className="text-secondary text-sm">Start a new chat</p>
                </div>
              </div>
            </div>
          ))
        )}
      </Modal>
    </div>
  );
};

export default LeftSideBar;
