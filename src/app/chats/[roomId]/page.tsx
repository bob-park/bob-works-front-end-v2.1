import { cookies } from 'next/headers';

import BackDrop from '@/components/BackDrop';
import ChatClient from '@/components/ChatClient';
import ky from 'ky';

import ChatRoom from './_component/ChatRoom';

const { CLIENT_SERVICE_PATH, BOB_CHAT_RS_HOST } = process.env;

export default async function ChatRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const { roomId } = params;

  const room = await ky
    .get(`${CLIENT_SERVICE_PATH}/maintenance/customer/chat/room/${roomId}`, {
      headers: {
        Cookie: `JSESSIONID=${cookies().get('JSESSIONID')?.value || ''}`,
      },
    })
    .json<MaintenanceCustomerChatRoom>();

  return (
    <div className="size-full">
      <div className="grid grid-cols-1 gap-10">
        {/* title */}
        <div>
          <div className="inline-block">
            <BackDrop />
            <span className="ml-2 text-xl font-semibold">{room.title}</span>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="justify-centergap-10 mt-6 flex h-max-without-appbar w-full flex-col items-center lg:w-[600px]">
        {/*<ChatRoom room={room} />*/}
        <ChatClient
          roomId={1}
          userId="hwpark"
          wsHost={BOB_CHAT_RS_HOST || 'localhost:8081/rs'}
        />
      </div>
    </div>
  );
}
