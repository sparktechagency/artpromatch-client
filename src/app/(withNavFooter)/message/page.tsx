'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ConfigProvider, Drawer, Spin } from 'antd';
import { FaUsers } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { BsEmojiSmile } from 'react-icons/bs';
import { IoIosAttach } from 'react-icons/io';
import { AudioOutlined } from '@ant-design/icons';
import LeftSideBar from '@/components/WithNavFooterComponents/LeftSideBar';
import { useUser } from '@/context/UserContext';
import { getSocket, initSocket } from '@/utils/socket';
import avatarImage from '@/assets/avatar.png';
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

interface Message {
  _id: string;
  text: string;
  msgByUser: string;
  seen: boolean;
  createdAt: string;
  conversationId?: string;
}

type MessageLike = Omit<Message, '_id' | 'conversationId'> & {
  _id: string | { toString(): string };
  conversationId?: string | { toString(): string };
};

const normalizeId = (value?: string | { toString(): string }) => {
  if (!value) return undefined;
  return typeof value === 'string' ? value : value.toString();
};

const normalizeMessage = (message: Message | MessageLike): Message => {
  const source = message as MessageLike;
  const normalizedId = normalizeId(source._id) ?? '';
  const normalizedConversationId = normalizeId(source.conversationId);

  return {
    ...message,
    _id: normalizedId,
    conversationId: normalizedConversationId,
  };
};

interface ChatUser {
  userId: string;
  name: string;
  profileImage?: string;
  online?: boolean;
}

const MessagePage = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isChatUserTyping, setIsChatUserTyping] = useState(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false);
  const activeConversationRef = useRef<string | null>(null);

  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get('conversationId') ?? '';
  const receiverId = searchParams.get('receiverId') ?? '';

  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  const fetchConversations = useCallback(() => {
    try {
      const socket = getSocket();
      socket.emit('get-conversations', {});
    } catch (error) {
      console.warn('Socket not ready yet.', error);
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const socket = initSocket(user.id);

    const handleConversationList = (data: {
      conversations?: Conversation[];
      result?: Conversation[];
    }) => {
      const list = data?.conversations ?? data?.result ?? [];
      if (Array.isArray(list)) {
        setConversations(list);
      }
    };

    const handleConversationCreated = (payload: { conversationId: string }) => {
      fetchConversations();

      if (!conversationId && receiverId) {
        router.replace(
          `/message?conversationId=${payload.conversationId}&receiverId=${receiverId}`
        );
      }
    };

    const handleGlobalNewMessage = () => fetchConversations();

    const handleSocketError = (err: unknown) => {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? (err as { message: string }).message
          : err;
      console.error('Socket error:', message);
    };

    socket.on('connect', fetchConversations);
    socket.on('conversation-list', handleConversationList);
    socket.on('conversation-created', handleConversationCreated);
    socket.on('new-message', handleGlobalNewMessage);
    socket.on('socket-error', handleSocketError);

    fetchConversations();

    return () => {
      socket.off('connect', fetchConversations);
      socket.off('conversation-list', handleConversationList);
      socket.off('conversation-created', handleConversationCreated);
      socket.off('new-message', handleGlobalNewMessage);
      socket.off('socket-error', handleSocketError);
    };
  }, [user?.id, fetchConversations, conversationId, receiverId, router]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const socket = getSocket();

    if (!conversationId) {
      if (activeConversationRef.current) {
        socket.emit('leave-conversation', activeConversationRef.current);
        activeConversationRef.current = null;
      }
      setMessages([]);
      setLoadingMessages(false);
      setIsChatUserTyping(false);
      return;
    }

    if (
      activeConversationRef.current &&
      activeConversationRef.current !== conversationId
    ) {
      socket.emit('leave-conversation', activeConversationRef.current);
    }

    activeConversationRef.current = conversationId;

    let isMounted = true;

    try {
      setLoadingMessages(true);
      socket.emit('message-page', { conversationId, page: 1, limit: 30 });

      const handleMessages = (data: {
        conversationId: string;
        messages: Message[];
        userData?: ChatUser;
      }) => {
        if (!isMounted || data.conversationId !== conversationId) return;
        const normalizedMessages = (data.messages || []).map(item =>
          normalizeMessage(item)
        );
        setMessages(normalizedMessages);
        if (data.userData) {
          setChatUser(data.userData);
        }
        setLoadingMessages(false);
      };

      const handleMessageUser = (data: ChatUser) => {
        if (!isMounted) return;
        setChatUser(prev => ({ ...prev, ...data }));
      };

      const handleIncomingMessage = (msg: Message) => {
        const normalized = normalizeMessage(msg);
        if (!isMounted || normalized.conversationId !== conversationId) return;
        setMessages(prev => {
          const exists = prev.some(existing => existing._id === normalized._id);
          return exists
            ? prev.map(existing =>
                existing._id === normalized._id
                  ? { ...existing, ...normalized }
                  : existing
              )
            : [...prev, normalized];
        });
      };

      const handleMessagesSeen = (data: {
        conversationId: string;
        messageIds: string[];
      }) => {
        if (!isMounted || data.conversationId !== conversationId) return;
        const ids = new Set(data.messageIds.map(id => id.toString()));
        setMessages(prev =>
          prev.map(message =>
            ids.has(message._id) ? { ...message, seen: true } : message
          )
        );
        fetchConversations();
      };

      const handleUserTyping = (payload: {
        conversationId: string;
        userId: string;
      }) => {
        if (!isMounted || payload.conversationId !== conversationId) return;
        if (payload.userId === user?.id) return;
        setIsChatUserTyping(true);
      };

      const handleUserStopTyping = (payload: {
        conversationId: string;
        userId: string;
      }) => {
        if (!isMounted || payload.conversationId !== conversationId) return;
        if (payload.userId === user?.id) return;
        setIsChatUserTyping(false);
      };

      socket.on('messages', handleMessages);
      socket.on('message-user', handleMessageUser);
      socket.on('new-message', handleIncomingMessage);
      socket.on('messages-seen', handleMessagesSeen);
      socket.on('user-typing', handleUserTyping);
      socket.on('user-stop-typing', handleUserStopTyping);

      return () => {
        isMounted = false;
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = null;
        }
        isTypingRef.current = false;
        socket.off('messages', handleMessages);
        socket.off('message-user', handleMessageUser);
        socket.off('new-message', handleIncomingMessage);
        socket.off('messages-seen', handleMessagesSeen);
        socket.off('user-typing', handleUserTyping);
        socket.off('user-stop-typing', handleUserStopTyping);
        socket.emit('leave-conversation', conversationId);
        if (activeConversationRef.current === conversationId) {
          activeConversationRef.current = null;
        }
      };
    } catch (error) {
      console.warn('Socket not ready yet.', error);
    }
  }, [user?.id, conversationId, fetchConversations]);

  useEffect(() => {
    if (conversationId || receiverId || conversations.length === 0) {
      return;
    }

    const { conversationId: nextConversationId, userData } = conversations[0];
    const nextReceiverId = userData?.userId;

    const query = new URLSearchParams({
      conversationId: nextConversationId ?? '',
    });

    if (nextReceiverId) {
      query.set('receiverId', nextReceiverId);
    }

    router.replace(`/message?${query.toString()}`);
  }, [conversations, conversationId, receiverId, router]);

  useEffect(() => {
    if (!receiverId) {
      return;
    }

    const fromList = conversations.find(
      conversation => conversation.userData?.userId === receiverId
    );

    if (fromList) {
      setChatUser(prev => ({
        ...prev,
        userId: fromList.userData.userId,
        name: fromList.userData.name,
        profileImage: fromList.userData.profileImage,
        online: fromList.userData.online,
      }));
    }
  }, [receiverId, conversations]);

  useEffect(() => {
    if (conversationId) {
      closeDrawer();
    }
  }, [conversationId]);

  const sendMessage = () => {
    if (!newMessage.trim() || !user?.id || !receiverId) return;

    try {
      const socket = getSocket();
      socket.emit('send-message', { receiverId, text: newMessage.trim() });
      setNewMessage('');
      emitStopTyping();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    } catch (error) {
      console.warn('Socket not ready yet.', error);
    }
  };

  const chatHeading = useMemo(() => {
    if (chatUser?.name) return chatUser.name;
    if (receiverId) return 'Starting new chat';
    return 'Select a conversation';
  }, [chatUser?.name, receiverId]);

  const chatStatus = useMemo(() => {
    if (isChatUserTyping) {
      return 'Typing...';
    }

    if (!chatUser) {
      return receiverId
        ? 'Send a message to begin the conversation'
        : 'Choose someone from the list to start chatting';
    }

    return chatUser.online ? 'Online' : 'Offline';
  }, [chatUser, receiverId, isChatUserTyping]);

  const emitStopTyping = useCallback(() => {
    if (!conversationId || !user?.id || !isTypingRef.current) return;

    try {
      const socket = getSocket();
      socket.emit('stop-typing', {
        conversationId,
        userId: user.id,
      });
    } catch (error) {
      console.warn('Socket not ready yet.', error);
    }

    isTypingRef.current = false;
  }, [conversationId, user?.id]);

  const handleTyping = useCallback(() => {
    if (!conversationId || !user?.id) return;

    try {
      const socket = getSocket();

      if (!isTypingRef.current) {
        socket.emit('typing', {
          conversationId,
          userId: user.id,
        });
        isTypingRef.current = true;
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        emitStopTyping();
        typingTimeoutRef.current = null;
      }, 1500);
    } catch (error) {
      console.warn('Socket not ready yet.', error);
    }
  }, [conversationId, user?.id, emitStopTyping]);

  const chatUserImage = chatUser?.profileImage
    ? getCleanImageUrl(chatUser.profileImage)
    : avatarImage;

  const orderedMessages = useMemo(() => messages, [messages]);

  // useEffect(() => {
  //   if (!messageEndRef.current) return;

  //   messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  // }, [orderedMessages, conversationId]);

  useEffect(() => {
    const container = document.getElementById('chatScrollContainer');
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [orderedMessages, conversationId]);

  return (
    <div className="container mx-auto px-2 md:px-4 lg:px-0 mb-10 lg:mb-0 overflow-hidden">
      <div className="flex flex-col lg:flex-row border border-neutral-200 rounded-2xl bg-white shadow-sm min-h-[70vh] lg:h-[80vh] lg:max-h-[80vh] overflow-hidden">
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-4 py-3 border-b border-neutral-200 bg-white lg:hidden">
          <button
            type="button"
            onClick={showDrawer}
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-100"
          >
            <FaUsers className="text-lg" />
            Conversations
          </button>
          <div className="flex items-center gap-3">
            <Image
              src={chatUserImage}
              alt={chatHeading}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {chatHeading}
              </p>
              <p className="text-xs text-gray-500">{chatStatus}</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex w-full max-w-sm border-r border-neutral-200 flex-col overflow-y-auto">
          <LeftSideBar conversations={conversations} />
        </div>

        <ConfigProvider theme={{ components: { Drawer: { paddingXS: 24 } } }}>
          <Drawer
            title="Chat List"
            placement="left"
            onClose={closeDrawer}
            open={isDrawerVisible}
            width="80%"
            closeIcon={<FaX className="text-black" />}
            className="lg:hidden"
          >
            <LeftSideBar conversations={conversations} />
          </Drawer>
        </ConfigProvider>

        <div className="flex-1 flex flex-col min-h-0 lg:h-full">
          <div className="hidden lg:flex sticky top-0 z-20 items-center justify-between gap-4 border-b border-neutral-200 px-6 py-4 bg-white">
            <div className="flex items-center gap-4">
              <Image
                src={chatUserImage}
                alt={chatHeading}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {chatHeading}
                </h2>
                <p className="text-sm text-gray-500">{chatStatus}</p>
              </div>
            </div>
          </div>

          <div
            ref={messageEndRef}
            className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 min-h-0 max-h-[calc(100vh-320px)] lg:max-h-[calc(100vh-360px)]"
            id="chatScrollContainer"
          >
            {loadingMessages ? (
              <div className="flex h-full w-full items-center justify-center">
                <Spin />
              </div>
            ) : !receiverId ? (
              <p className="mt-10 text-center text-gray-500">
                Select a conversation to start messaging.
              </p>
            ) : messages.length === 0 ? (
              <p className="mt-10 text-center text-gray-500">
                {conversationId
                  ? 'No messages yet. Say hello!'
                  : 'Starting a new chat...'}
              </p>
            ) : (
              orderedMessages.map(message => {
                const isOwnMessage = message.msgByUser === user?.id;
                const formattedTime = new Date(
                  message.createdAt
                ).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={message._id}
                    className={`flex w-full gap-3 ${
                      isOwnMessage ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {!isOwnMessage && (
                      <Image
                        src={chatUserImage}
                        alt={chatHeading}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                        isOwnMessage
                          ? 'bg-black text-white'
                          : 'bg-neutral-100 text-gray-900'
                      }`}
                    >
                      <p>{message.text}</p>
                      <span className="mt-2 block text-right text-xs text-gray-400">
                        {formattedTime}
                        {isOwnMessage && message.seen ? ' • Seen' : ''}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="border-t border-neutral-200 bg-white px-4 md:px-6 py-4">
            {receiverId ? (
              <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <BsEmojiSmile className="text-xl text-gray-500" />
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    className="grow border-none bg-transparent text-sm outline-none"
                    value={newMessage}
                    onChange={event => {
                      setNewMessage(event.target.value);
                      handleTyping();
                    }}
                    onKeyDown={event =>
                      event.key === 'Enter' ? sendMessage() : undefined
                    }
                    onBlur={() => {
                      if (typingTimeoutRef.current) {
                        clearTimeout(typingTimeoutRef.current);
                        typingTimeoutRef.current = null;
                      }
                      emitStopTyping();
                    }}
                  />
                  <IoIosAttach className="cursor-pointer text-lg text-gray-500" />
                  <AudioOutlined className="cursor-pointer text-lg text-gray-500" />
                  <button
                    type="button"
                    onClick={sendMessage}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
                  >
                    <div className="text-white">Send</div>
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500">
                Pick someone from the list to start chatting.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
