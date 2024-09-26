'use client';

// react
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
// daisyui
import { Button, Input } from 'react-daisyui';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// react-icons
import { GrEdit } from 'react-icons/gr';

import { useUpdateAvatar, useUpdatePassword } from '@/hooks/user';

type ProfileDetailProps = {
  user: User;
};

export default function ProfileDetail({ user }: ProfileDetailProps) {
  // state
  const [userAvatarSrc, setUserAvatarSrc] = useState<string>(
    '/api/user/avatar' || '/default_avatar.jpg',
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<string>('');

  // ref
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // query
  const { onUpdateAvatar } = useUpdateAvatar();
  const { onUpdatePassword } = useUpdatePassword();

  // useEffect
  useEffect(() => {
    user.avatar && setUserAvatarSrc('/api/user/avatar');
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

    onUpdateAvatar(formData);
  };

  const handleChangePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!changePassword) {
      return;
    }

    onUpdatePassword(changePassword);
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
        <div className="relative w-[256px]">
          <img
            className="h-[256px] w-[256px] rounded-full border"
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
            <GrEdit className="h-5 w-5" />
            Edit
          </Button>
        </div>
      </div>
      <div className="col-span-2">
        <form onSubmit={handleChangePassword}>
          <div className="flex items-end justify-start gap-2">
            <div className="form-control relative w-full max-w-xs">
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
                className="absolute bottom-0 right-0"
                type="button"
                shape="circle"
                color="ghost"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiOutlineEye className="h-5 w-5" />
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
