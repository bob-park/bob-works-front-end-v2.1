'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { useGetUserAll } from '@/hooks/user';

import ChatClient from '@/components/ChatClient';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';

timeago.register('ko', ko);

type CustomerChatProps = {
  user: User;
};

export default function CustomerChat({ user }: CustomerChatProps) {
  // state
  const [chatContents, setChatContents] = useState<string>('');
  const [chatList, setChatList] = useState<MaintenanceCustomerChat[]>([]);

  // ref
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // query
  const { users } = useGetUserAll();

  // useEffect
  useEffect(() => {
    handleScrollEnd();
  }, [chatList]);

  // handle
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!chatContents) {
      return;
    }

    // send(chatContents);

    setChatContents('');
  };

  const handleScrollEnd = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  return (
    <div className="h-[690px] w-[440px] rounded-3xl bg-base-100 p-8 shadow-2xl">
      <div className="flex size-full flex-col gap-4">
        {/* chat header */}
        <div className="flex flex-row gap-2">
          <div>
            <Image
              className="rounded-lg"
              width={56}
              height={56}
              src="/bob-works-icon.png"
              alt="bob-works-logo"
            />
          </div>
          <div className="col-span-4">
            <h2 className="mb-1 text-xl font-extrabold">고객센터</h2>
            <div className="text-sm text-gray-500">
              <p>불편한점을 문의해주세요. (상시 대기)</p>
            </div>
          </div>
        </div>

        {/* chat client */}
        <div className="h-[90%]">
          <ChatClient
            wsHost="localhost:9001/rs"
            roomId={1}
            userId={user.userId}
            users={users}
          />
        </div>
      </div>
    </div>
  );
}
