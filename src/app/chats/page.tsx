import ChatRoomContents from '@/app/chats/_component/ChatRoomContents';
import BackDrop from '@/components/BackDrop';

export default function ChatPage() {
  return (
    <div className="size-full">
      <div className="grid grid-cols-1 gap-10">
        {/* title */}
        <div>
          <div className="inline-block">
            <BackDrop />
            <span className="ml-2 text-xl font-semibold">고객의 소리 목록</span>
          </div>
        </div>

        {/* content */}
        <ChatRoomContents />
      </div>
    </div>
  );
}
