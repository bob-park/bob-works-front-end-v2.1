'use client';

// react
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

// daisyui
import { Button, Modal, Input, Divider } from 'react-daisyui';

// react-icons
import { GrEdit } from 'react-icons/gr';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { userActions } from '@/store/user';
import { commonActions } from '@/store/common';

// actions
const { requestUpdateUserAvatar, requestChangePassword } = userActions;
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<string>('');

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

  const handleChangePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!changePassword) {
      dispatch(
        addAlert({
          level: 'warn',
          message: '변경할 패스워드를 입력해주세요.',
          createAt: new Date(),
        }),
      );
      return;
    }

    dispatch(
      requestChangePassword({
        changePassword,
        handleAfter: () => {
          dispatch(
            addAlert({
              level: 'info',
              message:
                '사용자 패스워드가 변경되었습니다. 다음 로그인부터 적용됩니다.',
              createAt: new Date(),
            }),
          );
          setChangePassword('');
          setShowPassword(false);
        },
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
      <div className="col-span-2">
        <form onSubmit={handleChangePassword}>
          <div className="flex justify-start items-end gap-2">
            <div className="relative form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">패스워드 변경</span>
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                color="primary"
                placeholder="변경할 패스워드"
                value={changePassword}
                onChange={(e) => setChangePassword(e.target.value)}
              />
              <Button
                className="absolute right-0 bottom-0"
                type="button"
                shape="circle"
                color="ghost"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </Button>
            </div>
            <Button type="submit">변경</Button>
          </div>
        </form>
      </div>
    </>
  );
}
