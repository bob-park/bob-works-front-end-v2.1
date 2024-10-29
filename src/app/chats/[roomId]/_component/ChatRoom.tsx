'use client';

import { useGetUserAll } from '@/hooks/user';

import { useStore } from '@/shared/rootStore';

import ChatClient from '@/components/ChatClient';

const BOB_CHAT_RS_HOST = process.env.NEXT_PUBLIC_BOB_CHAT_RS_HOST;

type ChatRoomProps = {
  room: ChatRoomResponse;
};

export default function ChatRoom({ room }: ChatRoomProps) {
  // store
  const user = useStore((state) => state.user);

  // query
  const { users } = useGetUserAll();

  if (!user) {
    return;
  }

  return (
    <ChatClient
      roomId={room.id}
      userId={user.userId}
      wsHost={BOB_CHAT_RS_HOST || 'localhost:9001/rs'}
      users={users}
    />
  );
}
