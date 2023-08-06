'use client';

import { useRouter } from 'next/navigation';

import { Button } from 'react-daisyui';
import { IoChevronBackSharp } from 'react-icons/io5';

export default function BackDrop() {
  const router = useRouter();

  const handleBackDrop = () => {
    router.back();
  };

  return (
    <Button color="ghost" onClick={handleBackDrop}>
      <IoChevronBackSharp className="w-5 h-5" />
    </Button>
  );
}
