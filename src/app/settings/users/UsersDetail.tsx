'use client';

// react
import { ChangeEvent, useEffect, useRef, useState } from 'react';

// daisyui
import { Button, Modal, Input, Divider } from 'react-daisyui';

// react-icons
import { GrEdit } from 'react-icons/gr';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { userActions } from '@/store/user';
import { commonActions } from '@/store/common';

// actions
const { requestUpdateSignature } = userActions;
const { addAlert } = commonActions;

type UserDetailProps = {
  user: User;
};

export default function UserDetail({ user }: UserDetailProps) {
  // store
  const dispatch = useAppDispatch();

  // state
  const [userSignatureSrc, setUserSignatureSrc] = useState<string>(
    `/api/user/${user.id}/document/signature`,
  );

  // ref
  const signatureInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    signatureInputRef.current?.click();
  };

  const handleSignatureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    const signatureFile = files[0];

    const formData = new FormData();

    formData.append('signature', signatureFile);

    dispatch(
      requestUpdateSignature({
        id: user.id,
        formData,
        handleAfter: () => {
          const newSignatureSrc = URL.createObjectURL(signatureFile);
          setUserSignatureSrc(newSignatureSrc);

          dispatch(
            addAlert({
              level: 'info',
              message: '사용자 결재 서명이 변경되었습니다.',
              createAt: new Date(),
            }),
          );
        },
        exceptionHandle: {},
      }),
    );
  };

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-1 gap-5">
        <h2 className="text-lg font-semibold">결재 서명</h2>
        <div className="p-5 relative">
          <input
            type="file"
            hidden
            accept=".png,.jpg"
            ref={signatureInputRef}
            onChange={handleSignatureChange}
          />
          <div className="border border-gray-200 inline-block p-3 rounded-xl w-[256px]">
            <img
              className="w-[256px]"
              src={userSignatureSrc}
              onError={(e) =>
                (e.currentTarget.src = '/default-user-document-signature.png')
              }
            />
          </div>

          <Button
            className="absolute bottom-0 -left-1 border border-solid border-gray-300"
            animation
            onClick={handleEditClick}
          >
            <GrEdit className="w-5 h-5" />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
