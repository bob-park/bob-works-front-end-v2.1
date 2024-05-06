import { cookies } from 'next/headers';

import BackDrop from '@/components/BackDrop';
import LoanDetailContents from './_component/LoanDetailContents';

const API_URL = process.env.CLIENT_SERVICE_PATH;

export default async function LoanDetailPage({
  params,
}: {
  params: { loanId: number };
}) {
  const { loanId } = params;

  const response = await fetch(`${API_URL}/loan/${loanId}`, {
    method: 'get',
    headers: {
      Cookie: cookies().toString(),
    },
  });
  const loan = await response.json();

  return (
    <div className="size-full">
      <div className="grid grid-cols-1 gap-10">
        {/* title */}
        <div>
          <div className="inline-block">
            <BackDrop />
            <span className="text-xl font-semibold ml-2">대출 상세정보</span>
          </div>
        </div>

        {/* content */}
        <LoanDetailContents loan={loan} />
      </div>
    </div>
  );
}
