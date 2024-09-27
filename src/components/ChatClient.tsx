'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Badge, ChatBubble, Divider } from 'react-daisyui';
import { BsSendFill } from 'react-icons/bs';

import { formatDate } from '@/utils/ParseUtils';

import dayjs from 'dayjs';
import {
  Encodable,
  IdentitySerializer,
  JsonSerializer,
  RSocketClient,
} from 'rsocket-core';
import { Payload, ReactiveSocket } from 'rsocket-types';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';

timeago.register('ko', ko);

type ChatClientProps = {
  wsHost: string;
  roomId: number;
  userId: string;
  users?: User[];
};

function createClient(
  wsHost: string,
  roomId: number,
  receiver: (payload: ChatMessageResponse) => void,
) {
  // // receiver
  const responder = {
    fireAndForget(payload: Payload<ChatMessageResponse, Encodable>) {
      payload.data && receiver(payload.data);
    },
  };

  const client = new RSocketClient({
    serializers: {
      data: JsonSerializer,
      metadata: IdentitySerializer,
    },
    setup: {
      payload: {
        data: {
          id: roomId,
        },
        metadata: `${String.fromCharCode('connect'.length)}connect`,
      },
      keepAlive: 60000,
      lifetime: 180000,
      dataMimeType: 'application/json',
      metadataMimeType: 'message/x.rsocket.routing.v0',
    },
    responder,
    transport: new RSocketWebSocketClient({
      url: `ws://${wsHost}`,
    }),
  });

  return client.connect();
}

export default function ChatClient({
  wsHost,
  roomId,
  userId,
  users = [],
}: ChatClientProps) {
  // ref
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // state
  const [inputMessage, setInputMessage] = useState<string>('');
  const [socket, setSocket] =
    useState<ReactiveSocket<SendMessageRequest, Encodable>>();
  const [chatMessages, setChatMessages] = useState<ChatMessageResponse[]>([]);

  // useEffect
  useEffect(() => {
    const client = createClient(wsHost, roomId, (message) =>
      setChatMessages((prev) => [...prev, message]),
    );

    client.subscribe({
      onComplete: (comSocket) => {
        setSocket(comSocket);
      },
      onError: (error) => {
        console.log(error);
      },
    });

    return () => {
      socket?.close();
    };
  }, []);

  useEffect(() => {
    chatMessagesRef.current?.scroll({
      behavior: 'smooth',
      top: chatMessagesRef.current.scrollHeight,
    });
  }, [chatMessages]);

  // handle
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    send({
      room: {
        id: roomId,
      },
      userId,
      contents: inputMessage,
    });

    setInputMessage('');
  };

  const send = (sendMessage: SendMessageRequest) => {
    socket
      ?.requestResponse({
        data: sendMessage,
        metadata: `${String.fromCharCode('chat.message'.length)}chat.message`,
      })
      .subscribe({
        onComplete: () => {},
        onError: (error) => {
          console.log(error);
        },
        onSubscribe: () => {},
      });
  };

  const findUser = (id: string) => {
    return users.find((item) => item.userId === id);
  };

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      {/* chat list */}
      <div className="size-full overflow-auto" ref={chatMessagesRef}>
        {chatMessages.slice().map((chat, index) => {
          const prevChat = index - 1 >= 0 && chatMessages.slice()[index - 1];

          let isDivide = true;

          if (!!prevChat) {
            isDivide =
              dayjs(prevChat.createdDate).format('YYYYMMDD') !==
              dayjs(chat.createdDate).format('YYYYMMDD');
          }

          const u = findUser(chat.userId);

          return (
            <div key={chat.id}>
              {isDivide && (
                <Divider>
                  <Badge color="ghost">
                    {formatDate(chat.createdDate, 'yyyy년 MM월 dd일 (iii)')}
                  </Badge>
                </Divider>
              )}
              <ChatBubble end={chat.userId == userId}>
                <ChatBubble.Header>
                  {chat.userId == userId
                    ? '나'
                    : `${u ? `${u.userId} (${u.name})` : chat.userId}`}
                </ChatBubble.Header>
                <ChatBubble.Avatar
                  src={u ? `/api/user/${u.id}/avatar` : '/api/user/avatar'}
                />
                <ChatBubble.Message
                  color={chat.userId == userId ? 'primary' : 'neutral'}
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

      {/* message input */}
      <div className="w-full">
        <form className="flex flex-row gap-1" onSubmit={handleSendMessage}>
          <input
            className="input input-bordered flex-1"
            name="chat-input"
            placeholder="메세지"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button className="btn btn-primary flex-none" type="submit">
            <BsSendFill className="h-5 w-5" />
            전송
          </button>
        </form>
      </div>
    </div>
  );
}
