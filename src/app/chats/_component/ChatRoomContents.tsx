'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useChatRoomAll } from '@/hooks/chat';
import { useGetUserAll } from '@/hooks/user';

import dayjs from 'dayjs';

export default function ChatRoomContents() {
  // router
  const router = useRouter();

  // state
  const [currentPage, setCurrentPage] = useState<number>(0);

  // query
  const { chatRooms } = useChatRoomAll({});
  const { users } = useGetUserAll();

  // handle
  const handleClick = (roomId: number) => {
    router.push(`/chats/${roomId}`);
  };

  return (
    <div className="rounded-xl p-8 shadow-2xl">
      <table className="table">
        {/* head */}
        <thead className="bg-base-300">
          <tr>
            <th className="text-center">방 이름</th>
            <th className="text-center">고객</th>
            <th className="text-center">생성일</th>
          </tr>
        </thead>
        {/* contents */}
        <tbody>
          {(chatRooms || []).map((item) => (
            <tr key={`chat-room-id-${item.id}`} className="hover cursor-pointer" onClick={() => handleClick(item.id)}>
              <td className="text-left" width={400}>
                {item.name}
              </td>
              <td className="text-center">
                <span className="font-bold"></span>
              </td>
              <td className="text-center">{dayjs(item.createdDate).format('YYYY-MM-DD')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
