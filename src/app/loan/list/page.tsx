import BackDrop from '@/components/BackDrop';

import LoanContents from './_component/LoanContents';

export default function LoanListPage() {
  return (
    <div className="size-full">
      <div className="grid grid-cols-1 gap-10">
        {/* title */}
        <div>
          <div className="inline-block">
            <BackDrop />
            <span className="text-xl font-semibold ml-2">상세</span>
          </div>
        </div>

        {/* content */}
        <LoanContents />
      </div>
    </div>
  );
}
