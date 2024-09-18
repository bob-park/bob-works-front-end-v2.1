import { cookies } from 'next/headers';

import BackDrop from '@/components/BackDrop';
import ky from 'ky';

import ChatRoom from './_component/ChatRoom';

const CLIENT_SERVICE_PATH = process.env.CLIENT_SERVICE_PATH;

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
      <div className="justify-centergap-10 mt-6 flex w-full flex-col items-center lg:w-[600px]">
        <ChatRoom roomId={roomId} />
      </div>
    </div>
  );
}
