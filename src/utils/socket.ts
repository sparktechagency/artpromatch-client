// utils/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = (userId: string): Socket => {
  // If socket exists for a *different user*, reset it
  //   if (socket && socket.connected && socket.io.opts.query?.id !== userId) {
  //     socket.disconnect();
  //     socket = null;
  //   }

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_MAIN_API as string, {
      query: { id: userId },
      transports: ['websocket'],
      //  reconnection: true,
      //  reconnectionAttempts: 5,
      //  reconnectionDelay: 1000,
    });

    socket.on('connect_error', err => {
      console.error('❌ Socket connection error:', err.message);
    });

    socket.on('disconnect', reason => {
      console.warn('⚠️ Socket disconnected:', reason);
    });
  }

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) throw new Error('Socket not initialized');
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
