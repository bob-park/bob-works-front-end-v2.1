'use client';

import { useGetUserAll } from '@/hooks/user';

import { useStore } from '@/shared/rootStore';

import ChatClient from '@/components/ChatClient';

type ChatRoomProps = {
  room: MaintenanceCustomerChatRoom;
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
      roomId={1}
      userId={user.userId}
      wsHost={'localhost:9001/rs'}
      users={users}
    />
  );
}
