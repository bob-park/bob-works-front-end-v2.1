import { cookies } from 'next/headers';

import BackDrop from '@/components/BackDrop';
import ky from 'ky';

import ChatRoom from './_component/ChatRoom';

const { CLIENT_SERVICE_PATH } = process.env;

export default async function ChatRoomPage(props: {
  params: Promise<{ roomId: string }>;
}) {
  const params = await props.params;
  const { roomId } = params;

  const room = await ky
    .get(`${CLIENT_SERVICE_PATH}/chat/room/${roomId}`, {
      headers: {
        Cookie: `JSESSIONID=${(await cookies()).get('JSESSIONID')?.value || ''}`,
      },
    })
    .json<ChatRoomResponse>();

  return (
    <div className="size-full">
      <div className="grid grid-cols-1 gap-10">
        {/* title */}
        <div>
          <div className="inline-block">
            <BackDrop />
            <span className="ml-2 text-xl font-semibold">{room.name}</span>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="justify-centergap-10 mt-6 flex h-max-without-appbar w-full flex-col items-center lg:w-[600px]">
        <ChatRoom room={room} />
      </div>
    </div>
  );
}
