'use client';

import React, { ReactNode, createContext, useEffect, useState } from 'react';

import Toast from '@/components/toast/Toast';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { v4 as uuid } from 'uuid';

dayjs.extend(relativeTime);

type ToastProviderContextState = {
  messages: ToastMessage[];
  push: (message: string, level: MessageLevel) => void;
};

type ToastProviderProps = {
  children: ReactNode;
  limit: number;
  timeout: number;
};

export const ToastContext = createContext<ToastProviderContextState>({
  messages: [],
  push: (message, level) => {},
});

export default function ToastProvider({
  children,
  limit,
  timeout,
}: ToastProviderProps) {
  // state
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  // useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      messages
        .filter(
          (item) => dayjs(item.createdDate).unix() < dayjs().unix() - timeout,
        )
        .forEach((item) => handleRemove(item.id));
    }, 1_000);

    return () => clearInterval(intervalId);
  }, [messages]);

  // handle
  const handlePushMessage = (message: string, level: MessageLevel) => {
    setMessages((prev) => {
      const newMessages = prev.slice();

      if (newMessages.length >= limit) {
        newMessages.splice(newMessages.length - 1, 1);
      }

      const createdMessage = {
        id: uuid(),
        level,
        message,
        createdDate: new Date(),
      };

      newMessages.unshift(createdMessage);

      return newMessages;
    });
  };

  const handleRemove = (id: string) => {
    setMessages((prev) => prev.slice().filter((item) => item.id !== id));
  };

  return (
    <ToastContext.Provider value={{ messages, push: handlePushMessage }}>
      <div className="fixed right-0 top-20 z-50 mb-2 mr-5 mt-2 flex flex-col items-end gap-2">
        {messages.map((message) => (
          <Toast
            key={`alert-${message.id}`}
            message={message}
            timeout={timeout}
            onRemove={() => handleRemove(message.id)}
          />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
}
