'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Badge, Button, ChatBubble, Divider, Form, Input } from 'react-daisyui';
import { BsSendFill } from 'react-icons/bs';

import useGetChatAll from '@/hooks/maintenance/useGetChatAll';
import useSendChat from '@/hooks/maintenance/useSendChat';
import { useAppSelector } from '@/hooks/reduxHook';

import { formatDate } from '@/utils/ParseUtils';

import { useStore } from '@/shared/rootStore';

import dayjs from 'dayjs';
import TimeAgo from 'timeago-react';

type ChatRoomProps = {
  room: MaintenanceCustomerChatRoom;
};

export default function ChatRoom({ room }: ChatRoomProps) {
  // store
  const user = useStore((state) => state.user);

  // ref
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // state
  const [message, setMessage] = useState<string>('');
  const [chatList, setChatList] = useState<MaintenanceCustomerChat[]>([]);

  const { pages, reload } = useGetChatAll(room.id);
  const { send, isLoading } = useSendChat(room.id, (data) => {
    setChatList((prev) => {
      const newChatList = chatList.slice();

      chatList.push({
        ...data,
        writerId: user.id,
        createdDate: new Date(),
      });

      return newChatList;
    });
  });

  // useEffect
  useEffect(() => {
    const newChatList = new Array<MaintenanceCustomerChat>();

    pages.forEach((page) => {
      const chats = page.content;
      newChatList.push(...chats);
    });

    newChatList.sort((o1, o2) => {
      const o1Num = dayjs(o1.createdDate).unix();
      const o2Num = dayjs(o2.createdDate).unix();

      return o1Num > o2Num ? 1 : -1;
    });

    setChatList(newChatList);
  }, [pages.length != 0 && pages[0].total]);

  useEffect(() => {
    handleScrollEnd();
  }, [chatList]);

  // handle
  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    send(message);

    // end
    setMessage('');
  };

  const handleScrollEnd = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  return (
    <div className="flex size-full flex-col items-center gap-2 rounded-2xl p-6 shadow-2xl">
      {/* chat list */}
      <div className="col-span-5 h-[500px] w-full overflow-auto">
        <div ref={messageEndRef}>
          {chatList.slice().map((chat, index) => {
            const prevChat = index - 1 >= 0 && chatList.slice()[index - 1];

            let isDivide = true;

            if (!!prevChat) {
              isDivide =
                dayjs(prevChat.createdDate).format('YYYYMMDD') !==
                dayjs(chat.createdDate).format('YYYYMMDD');
            }

            return (
              <div key={chat.id}>
                {isDivide && (
                  <Divider>
                    <Badge color="ghost">
                      {formatDate(chat.createdDate, 'yyyy년 MM월 dd일 (iii)')}
                    </Badge>
                  </Divider>
                )}
                <ChatBubble end={chat.writerId == user?.id}>
                  <ChatBubble.Header>
                    {chat.writerId == user?.id
                      ? '나'
                      : `${room.customer?.name} (${room.customer?.userId})`}
                  </ChatBubble.Header>
                  <ChatBubble.Avatar
                    src={`/api/user/${chat.writerId}/avatar`}
                  />
                  <ChatBubble.Message
                    color={chat.writerId == user?.id ? 'primary' : 'neutral'}
                  >
                    {chat.contents}
                  </ChatBubble.Message>
                  <ChatBubble.Footer>
                    <TimeAgo datetime={chat.createdDate} locale="ko" />
                  </ChatBubble.Footer>
                </ChatBubble>
              </div>
            );
          })}
        </div>
      </div>

      {/* chat input */}
      <div className="col-span-5 w-full">
        <Form
          className="grid grid-cols-8 items-center justify-center gap-2"
          onSubmit={handleSend}
        >
          <div className="col-span-6">
            <Input
              className="w-full"
              placeholder="내용을 입력해주세요."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <Button
              className="w-full"
              type="submit"
              color="neutral"
              disabled={isLoading}
            >
              <BsSendFill className="h-5 w-5" />
              전송
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
