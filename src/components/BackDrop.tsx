'use client';

import { IoChevronBackSharp } from 'react-icons/io5';

import { useRouter } from 'next/navigation';

import { Button } from 'react-daisyui';

export default function BackDrop() {
  const router = useRouter();

  const handleBackDrop = () => {
    router.back();
  };

  return (
    <Button color="ghost" onClick={handleBackDrop}>
      <IoChevronBackSharp className="h-5 w-5" />
    </Button>
  );
}
