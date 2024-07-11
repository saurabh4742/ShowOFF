"use client"
import { useUser } from '@clerk/nextjs';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

export const useSocket = (): Socket | null => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    
    if (user?.id) {
      const newSocket = io('https://showoffsocketserver.onrender.com', { autoConnect: false });
      setSocket(newSocket);
      newSocket.connect();
      newSocket.emit("clerkuserId", user.id)
      return () => {
        newSocket.disconnect();
      };
    }
  }, [user?.id]);
;

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
