'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { Button, ChatBubble, Form, Input } from 'react-daisyui';

import { BsSendFill } from 'react-icons/bs';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { maintenanceActions } from '@/store/maintenance';
import { PaginationParams } from '@/store/types';

import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';
import { CustomerChat } from '@/store/maintenance/types';
import { v4 as uuid } from 'uuid';

timeago.register('ko', ko);

// actions
const {
  requestGetLatestCustomerChatRoom,
  requestGetCustomerChatList,
  requestSendCustomerChat,
} = maintenanceActions;

export default function CustomerChat() {
  // store
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const {
    isLoading,
    customerChatRoom,
    customerChats,
    searchCustomerChatParam,
  } = useAppSelector((state) => state.maintenance);

  // state
  const [chatContents, setChatContents] = useState<string>('');
  const [searchChatParams, setSearchChatParams] = useState<PaginationParams>({
    ...searchCustomerChatParam,
  });
  const [chatList, setChatList] = useState<CustomerChat[]>([
    ...customerChats.content,
  ]);
  const [isSending, setIsSending] = useState<boolean>(false);

  // ref
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // useEffect
  useEffect(() => {
    dispatch(requestGetLatestCustomerChatRoom());
  }, []);

  useEffect(() => {
    handleGetChatList();
  }, [customerChatRoom]);

  useEffect(() => {
    setChatList((prev) => {
      const newList = customerChats.content.slice();
      const prevList = prev.slice();

      return prevList.concat(newList);
    });
  }, [customerChats]);

  useEffect(() => {
    handleScrollEnd();
  }, [chatList]);

  useEffect(() => {
    if (!isSending) {
      return;
    }

    if (!customerChatRoom || !user) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setChatList((prev) => {
        const newChatList = prev.slice();

        newChatList.unshift({
          id: uuid(),
          writerId: 11,
          contents: '접수되었습니다.',
          createdDate: new Date(),
        });

        return newChatList;
      });

      setIsSending(false);
    }, 3_000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSending]);

  // handle
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!customerChatRoom || !user) {
      return;
    }

    handleSendChat(customerChatRoom.id, chatContents, user.id, user.userId);

    setIsSending(true);
  };

  const handleSendChat = (
    roomId: string,
    contents: string,
    writerUniqueId: number,
    writerId: string,
  ) => {
    dispatch(
      requestSendCustomerChat({
        roomId,
        userId: writerId,
        userUniqueId: writerUniqueId,
        contents: contents,
      }),
    );

    setChatList((prev) => {
      const newChatList = prev.slice();

      newChatList.unshift({
        id: uuid(),
        contents,
        writerId: writerUniqueId,
        createdDate: new Date(),
      });

      return newChatList;
    });

    setChatContents('');
  };

  const handleGetChatList = () => {
    customerChatRoom &&
      dispatch(
        requestGetCustomerChatList({
          ...searchChatParams,
          roomId: customerChatRoom.id,
        }),
      );
  };

  const handleScrollEnd = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  return (
    <div className="bg-base-100 shadow-2xl rounded-3xl w-[440px] h-[690px] p-8">
      <div className="grid grid-cols-5 gap-4 justify-items-start items-center">
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
        <div className="col-span-5 w-full h-[500px] overflow-auto">
          <div ref={messageEndRef}>
            {chatList
              .slice()
              .reverse()
              .map((chat) => (
                <ChatBubble key={chat.id} end={chat.writerId == user?.id}>
                  <ChatBubble.Header>
                    {chat.writerId == user?.id ? '나' : '고객센터'}
                  </ChatBubble.Header>
                  <ChatBubble.Avatar
                    src={
                      chat.writerId == user?.id
                        ? user?.avatar || '/default_avatar.jpg'
                        : '/customer_service_center.png'
                    }
                  />
                  <ChatBubble.Message>{chat.contents}</ChatBubble.Message>
                  <ChatBubble.Footer>
                    <TimeAgo datetime={chat.createdDate} locale="ko" />
                  </ChatBubble.Footer>
                </ChatBubble>
              ))}
          </div>
        </div>

        {/* chat input */}
        <div className="col-span-5 w-full">
          <Form
            className="grid grid-cols-8 gap-2 justify-center items-center"
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
              <Button className="w-full" type="submit" color="neutral">
                <BsSendFill className="w-5 h-5" />
                전송
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
