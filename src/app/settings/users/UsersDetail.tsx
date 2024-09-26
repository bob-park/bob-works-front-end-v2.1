'use client';

// react
import { ChangeEvent, useRef, useState } from 'react';
// daisyui
import { Button } from 'react-daisyui';
// react-icons
import { GrEdit } from 'react-icons/gr';

type UserDetailProps = {
  user: User;
};

export default function UserDetail({ user }: UserDetailProps) {
  // state
  const [userSignatureSrc, setUserSignatureSrc] = useState<string>(
    `/api/user/${user.id}/document/signature`,
  );

  // ref
  const signatureInputRef = useRef<HTMLInputElement>(null);

  // query

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
  };

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-1 gap-5">
        <h2 className="text-lg font-semibold">결재 서명</h2>
        <div className="relative p-5">
          <input
            type="file"
            hidden
            accept=".png,.jpg"
            ref={signatureInputRef}
            onChange={handleSignatureChange}
          />
          <div className="inline-block w-[256px] rounded-xl border border-gray-200 p-3">
            <img
              className="w-[256px]"
              src={userSignatureSrc}
              onError={(e) =>
                (e.currentTarget.src = '/default-user-document-signature.png')
              }
            />
          </div>

          <Button
            className="absolute -left-1 bottom-0 border border-solid border-gray-300"
            animation
            onClick={handleEditClick}
          >
            <GrEdit className="h-5 w-5" />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
