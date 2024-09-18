'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Badge, Button, ChatBubble, Divider, Form, Input } from 'react-daisyui';
import { BsSendFill } from 'react-icons/bs';

import Image from 'next/image';

import useGetChatAll from '@/hooks/maintenance/useGetChatAll';
import useSendChat from '@/hooks/maintenance/useSendChat';

import { formatDate } from '@/utils/ParseUtils';

import dayjs from 'dayjs';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';

timeago.register('ko', ko);

type CustomerChatProps = {
  user: User;
};

export default function CustomerChat({ user }: CustomerChatProps) {
  // state
  const [chatContents, setChatContents] = useState<string>('');
  const [chatList, setChatList] = useState<MaintenanceCustomerChat[]>([]);

  // ref
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const { pages, reload } = useGetChatAll(
    '2023-5f090b16-a40a-4c4d-a24d-c30598c438c0',
  );
  const { send, isLoading } = useSendChat(
    '2023-5f090b16-a40a-4c4d-a24d-c30598c438c0',
    (data) => {
      setChatList((prev) => {
        const newChatList = chatList.slice();

        chatList.push({
          ...data,
          writerId: user.id,
          createdDate: new Date(),
        });

        return newChatList;
      });

      console.log('send message');
    },
  );

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
  }, [pages.flat().length]);

  useEffect(() => {
    handleScrollEnd();
  }, [chatList]);

  // handle
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!chatContents) {
      return;
    }

    send(chatContents);

    setChatContents('');
  };

  const handleScrollEnd = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  return (
    <div className="h-[690px] w-[440px] rounded-3xl bg-base-100 p-8 shadow-2xl">
      <div className="grid grid-cols-5 items-center justify-items-start gap-4">
        {/* chat header */}
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
                      {chat.writerId == user?.id ? '나' : '고객센터'}
                    </ChatBubble.Header>
                    <ChatBubble.Avatar
                      src={
                        chat.writerId == user?.id
                          ? '/api/user/avatar'
                          : '/customer_service_center.png'
                      }
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
            onSubmit={handleSubmit}
          >
            <div className="col-span-6">
              <Input
                className="w-full"
                placeholder="내용을 입력해주세요."
                value={chatContents}
                onChange={(e) => setChatContents(e.target.value)}
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
    </div>
  );
}
