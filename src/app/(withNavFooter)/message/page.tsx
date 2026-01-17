'use client';

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ConfigProvider, Drawer, Spin } from 'antd';
import { FaUsers } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { BsEmojiSmile } from 'react-icons/bs';
import { IoIosAttach } from 'react-icons/io';
// import { AudioOutlined } from '@ant-design/icons';
import LeftSideBar from '@/components/WithNavFooterComponents/LeftSideBar';
import { useUser } from '@/context/UserContext';
import { getSocket, initSocket } from '@/utils/socket';
import avatarImage from '@/assets/avatar.png';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { toast } from 'sonner';

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
  imageUrl?: string[];
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

const formatMessageTimestamp = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const today = new Date();
  const dayStart = (input: Date) =>
    new Date(input.getFullYear(), input.getMonth(), input.getDate());
  const diffMs = dayStart(today).getTime() - dayStart(date).getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return time;
  }

  if (diffDays === 1) {
    return `Yesterday ${time}`;
  }

  if (diffDays > 1 && diffDays < 7) {
    const weekday = date.toLocaleDateString([], { weekday: 'long' });
    return `${weekday} ${time}`;
  }

  const fullDate = date.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return `${fullDate} ${time}`;
};

interface ChatUser {
  userId: string;
  name: string;
  profileImage?: string;
  online?: boolean;
}

const MessageContent = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isChatUserTyping, setIsChatUserTyping] = useState(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false);
  const activeConversationRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get('conversationId') ?? '';
  const receiverId = searchParams.get('receiverId') ?? '';
  const receiverName = searchParams.get('receiverName') ?? '';
  const receiverImage = searchParams.get('receiverImage') ?? '';

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
          `/message?conversationId=${payload.conversationId}&receiverId=${receiverId}`,
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
      toast.error(
        typeof message === 'string'
          ? message
          : 'Something went wrong. Please try again.',
      );
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
      setChatUser(null);
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
          normalizeMessage(item),
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
                  : existing,
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
            ids.has(message._id) ? { ...message, seen: true } : message,
          ),
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
      setChatUser(null);
      return;
    }

    const fromList = conversations.find(
      conversation => conversation.userData?.userId === receiverId,
    );

    if (fromList) {
      setChatUser(prev => ({
        ...prev,
        userId: fromList.userData.userId,
        name: fromList.userData.name,
        profileImage: fromList.userData.profileImage,
        online: fromList.userData.online,
      }));
      return;
    }

    setChatUser(prev => ({
      userId: receiverId,
      name: receiverName || prev?.name || '',
      profileImage: receiverImage || prev?.profileImage,
      online: prev?.online ?? false,
    }));
  }, [receiverId, receiverName, receiverImage, conversations]);

  useEffect(() => {
    if (conversationId) {
      closeDrawer();
    }
  }, [conversationId]);

  const sendMessage = () => {
    const trimmed = newMessage.trim();
    if (!trimmed && attachments.length === 0) return;
    if (!user?.id || !receiverId) return;

    try {
      const socket = getSocket();
      const payload: {
        receiverId: string;
        text?: string;
        imageBase64?: string[];
      } = { receiverId };

      if (trimmed) {
        payload.text = trimmed;
      }

      if (attachments.length > 0) {
        payload.imageBase64 = attachments;
      }

      socket.emit('send-message', payload);
      setNewMessage('');
      setAttachments([]);
      emitStopTyping();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    } catch (error) {
      console.warn('Socket not ready yet.', error);
      toast.error('Unable to send message. Please try again.');
    }
  };

  const handleAttachmentButtonClick = () => {
    fileInputRef.current?.click();
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () =>
        reject(reader.error ?? new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const compressImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = document.createElement('img');
      const url = URL.createObjectURL(file);

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error('Canvas not supported'));
          return;
        }

        const MAX_DIMENSION = 1280;
        let { width, height } = image;

        if (width > height && width > MAX_DIMENSION) {
          height = (height * MAX_DIMENSION) / width;
          width = MAX_DIMENSION;
        } else if (height >= width && height > MAX_DIMENSION) {
          width = (width * MAX_DIMENSION) / height;
          height = MAX_DIMENSION;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            URL.revokeObjectURL(url);
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                resolve(reader.result);
              } else {
                reject(new Error('Failed to read compressed image'));
              }
            };
            reader.onerror = () =>
              reject(
                reader.error ?? new Error('Failed to read compressed image'),
              );
            reader.readAsDataURL(blob);
          },
          file.type.includes('png') ? 'image/png' : 'image/jpeg',
          0.85,
        );
      };

      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image for compression'));
      };

      image.src = url;
    });
  };

  const getProcessedBase64 = async (file: File) => {
    const SIZE_THRESHOLD = 1.5 * 1024 * 1024; // 1.5MB
    if (file.size <= SIZE_THRESHOLD) {
      return fileToBase64(file);
    }

    try {
      return await compressImageToBase64(file);
    } catch (error) {
      console.warn('Compression failed, using original image', error);
      return fileToBase64(file);
    }
  };

  const handleFilesSelected = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target?.files;
    if (!files || files.length === 0) {
      if (event.target) {
        event.target.value = '';
      }
      return;
    }

    const MAX_ATTACHMENTS = 5;
    const current = attachments.length;
    const remainingSlots = MAX_ATTACHMENTS - current;

    if (remainingSlots <= 0) {
      toast.error(
        `You can attach up to ${MAX_ATTACHMENTS} images per message.`,
      );
      if (event.target) {
        event.target.value = '';
      }
      return;
    }

    const SIZE_LIMIT = 400 * 1024; // 400KB
    const selectedFiles = Array.from(files)
      .filter(file => {
        if (file.size > SIZE_LIMIT) {
          toast.error(
            `${file.name} is larger than 400KB. Please choose a smaller image.`,
          );
          return false;
        }
        return true;
      })
      .slice(0, remainingSlots);

    if (selectedFiles.length === 0) {
      if (event.target) {
        event.target.value = '';
      }
      return;
    }

    try {
      const base64List = await Promise.all(
        selectedFiles.map(getProcessedBase64),
      );
      setAttachments(prev => [...prev, ...base64List]);
    } catch (error) {
      console.error(error);
      toast.error('Failed to process selected images.');
    } finally {
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== index));
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
          <LeftSideBar
            conversations={conversations}
            activeConversationId={conversationId}
          />
        </div>

        <ConfigProvider theme={{ components: { Drawer: { paddingXS: 24 } } }}>
          <Drawer
            title="Chat List"
            placement="left"
            onClose={closeDrawer}
            open={isDrawerVisible}
            size="large"
            closeIcon={<FaX className="text-black" />}
            className="lg:hidden"
            styles={{ body: { padding: 0 }, wrapper: { maxWidth: '80%' } }}
          >
            <LeftSideBar
              conversations={conversations}
              activeConversationId={conversationId}
            />
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
                const formattedTime = formatMessageTimestamp(message.createdAt);

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
                      {message.text && message.text.trim() !== '' && (
                        <p>{message.text}</p>
                      )}
                      {Array.isArray(message.imageUrl) &&
                        message.imageUrl.length > 0 && (
                          <div
                            className="mt-3 grid gap-2"
                            style={{
                              gridTemplateColumns:
                                'repeat(auto-fit, minmax(120px, 1fr))',
                            }}
                          >
                            {message.imageUrl.map((url, idx) => (
                              <a
                                key={`${message._id}-img-${idx}`}
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="block overflow-hidden rounded-xl border border-white/10"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={url}
                                  alt="Message attachment"
                                  className="h-32 w-full object-cover"
                                />
                              </a>
                            ))}
                          </div>
                        )}
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
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {attachments.map((src, index) => (
                      <div
                        key={`attachment-${index}`}
                        className="relative h-20 w-20 overflow-hidden rounded-xl border"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt="Attachment preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="absolute -top-2 -right-2 rounded-full bg-black/80 px-2 text-xs text-white"
                          aria-label="Remove attachment"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                  <IoIosAttach
                    className="cursor-pointer text-lg text-gray-500"
                    onClick={handleAttachmentButtonClick}
                  />
                  {/* <AudioOutlined className="cursor-pointer text-lg text-gray-500" /> */}
                  <button
                    type="button"
                    onClick={sendMessage}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white cursor-pointer"
                  >
                    <div className="text-white">Send</div>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFilesSelected}
                  />
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

const MessagePage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Spin />
        </div>
      }
    >
      <MessageContent />
    </Suspense>
  );
};

export default MessagePage;
