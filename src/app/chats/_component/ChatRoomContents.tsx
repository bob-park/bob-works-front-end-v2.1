'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import useGetChatRoomsAll from '@/hooks/maintenance/useGetChatRoomsAll';

import dayjs from 'dayjs';

export default function ChatRoomContents() {
  // router
  const router = useRouter();

  // state
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { page, fetchNextPage, isLoading } = useGetChatRoomsAll();

  // handle
  const handleClick = (roomId: string) => {
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
          {page?.pages[currentPage].content.map((item) => (
            <tr
              key={`chat-room-id-${item.id}`}
              className="hover cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              <td className="text-left" width={400}>
                {item.title}
              </td>
              <td className="text-center">
                <span className="font-bold">
                  {item.customer?.name || ''}
                  <span className="font-normal">
                    {' '}
                    ({item.customer?.userId})
                  </span>
                </span>
              </td>
              <td className="text-center">
                {dayjs(item.createdDate).format('YYYY-MM-DD')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
