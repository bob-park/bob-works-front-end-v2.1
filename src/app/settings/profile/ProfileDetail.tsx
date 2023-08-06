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
const { requestUpdateUserAvatar, requestGetUser } = userActions;
const { addAlert } = commonActions;

type ProfileDetailProps = {
  user: User;
};

export default function ProfileDetail({ user }: ProfileDetailProps) {
  // store
  const dispatch = useAppDispatch();
  // const { user } = useAppSelector((state) => state.user);

  // state
  const [userAvatarSrc, setUserAvatarSrc] = useState<string>(
    user.avatar || '/default_avatar.jpg',
  );

  // ref
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // useEffect
  useEffect(() => {
    user.avatar && setUserAvatarSrc(user.avatar);
  }, [user]);

  const handleEditAvatar = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    const avatarFile = files[0];

    // ? 확장자...확인 필요할까?

    const formData = new FormData();

    formData.append('avatar', avatarFile);

    dispatch(
      requestUpdateUserAvatar({
        formData,
        handleAfter: () => {
          const newAvatarSrc = URL.createObjectURL(avatarFile);
          setUserAvatarSrc(newAvatarSrc);

          dispatch(
            addAlert({
              level: 'info',
              message: '사용자 아바타가 변경되었습니다. 추후 적용됩니다.',
              createAt: new Date(),
            }),
          );
        },
        exceptionHandle: {},
      }),
    );
  };

  return (
    <>
      <div className="col-span-2">
        <div className="grid grid-cols-1 gap-10">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">팀</span>
            </label>
            <Input value={user.team.name} disabled />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">직급</span>
            </label>
            <Input value={user.position?.name} disabled />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">이름</span>
            </label>
            <Input value={user.name} disabled />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="w-[256px] relative">
          <img
            className="w-[256px] h-[256px] border rounded-full"
            src={userAvatarSrc}
          />
          <input
            type="file"
            hidden
            ref={avatarInputRef}
            accept=".png,.jpg"
            onChange={handleAvatarChange}
          />
          <Button
            className="absolute bottom-0 border border-solid border-gray-300"
            animation
            onClick={handleEditAvatar}
          >
            <GrEdit className="w-5 h-5" />
            Edit
          </Button>
        </div>
      </div>
    </>
  );
}
