'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';

import { Button, Form, Input } from 'react-daisyui';

import { BsSendFill } from 'react-icons/bs';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { maintenanceActions } from '@/store/maintenance';

// actions
const { requestGetLatestCustomerChatRoom } = maintenanceActions;

export default function CustomerChat() {
  // state
  const [chatContents, setChatContents] = useState<string>('');

  // store
  const dispatch = useAppDispatch();
  const {
    isLoading,
    customerChatRoom,
    customerChats,
    searchCustomerChatParam,
  } = useAppSelector((state) => state.maintenance);

  // useEffect
  useEffect(() => {
    dispatch(requestGetLatestCustomerChatRoom());
  }, []);

  // handle
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(chatContents);

    // TODO send server

    setChatContents('');
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
          contents
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
