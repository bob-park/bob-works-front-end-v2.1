import BackDrop from '@/components/BackDrop';

import LoanDetailContents from './_component/LoanDetailContents';
import LoanRepaymentList from './_component/LoanRepaymentList';

export default async function LoanDetailPage({ params }: { params: { loanId: number } }) {
  const { loanId } = params;

  return (
    <div className="size-full">
      <div className="grid grid-cols-1 gap-10">
        {/* title */}
        <div>
          <div className="inline-block">
            <BackDrop />
            <span className="ml-2 text-xl font-semibold">대출 상세정보</span>
          </div>
        </div>

        {/* content */}
        <LoanDetailContents loanId={loanId} />

        {/* repayment list */}
        <LoanRepaymentList loanId={loanId} />
      </div>
    </div>
  );
}
