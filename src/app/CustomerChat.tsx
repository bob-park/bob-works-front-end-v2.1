'use client';

import { useEffect } from 'react';

import Image from 'next/image';

import { useChatRoomAll, useCreateChatRoom, useMyChatRoom } from '@/hooks/chat';
import { useGetUserAll } from '@/hooks/user';

import ChatClient from '@/components/ChatClient';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';

timeago.register('ko', ko);

const BOB_CHAT_RS_HOST = process.env.NEXT_PUBLIC_BOB_CHAT_RS_HOST;

type CustomerChatProps = {
  user: User;
};

function addRoomUser(
  rooms: ChatRoomResponse[],
  func: (roomId: number) => void,
) {
  if (rooms.length === 0) {
    return;
  }

  const room = rooms[0];

  func(room.id);
}

export default function CustomerChat({ user }: CustomerChatProps) {
  // state

  // query
  const { users } = useGetUserAll();
  const { myRoom, isLoading } = useMyChatRoom();

  // useEffect

  // handle
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
          {myRoom && (
            <ChatClient
              wsHost={BOB_CHAT_RS_HOST || 'localhost:9001/rs'}
              roomId={myRoom.id}
              userId={user.userId}
              users={users}
            />
          )}
        </div>
      </div>
    </div>
  );
}
