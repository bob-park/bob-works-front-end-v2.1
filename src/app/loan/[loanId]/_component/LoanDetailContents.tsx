'use client';

import useGetLoanDetail from '@/hooks/loan/useGetDetailLoan';

import dayjs from 'dayjs';

type LoanDetailContentsProps = {
  loanId: number;
};

function parseRepaymentType(type: LoanRepaymentType) {
  switch (type) {
    case 'LEVEL_PAYMENT':
      return '원리금 균등 분할 상환';
    case 'EQUAL_PRINCIPAL_PAYMENT':
      return '원금 균등 분할 상환';
    case 'BALLOON_PAYMENT':
      return '만기 일시 상환';
    default:
      return '사용자 설정';
  }
}

export default function LoanDetailContents({ loanId }: LoanDetailContentsProps) {
  // query
  const { loan } = useGetLoanDetail(loanId);

  if (!loan) {
    return;
  }

  return (
    <div className="grid w-full grid-cols-6 gap-6 rounded-2xl p-10 shadow-xl">
      {/* 대출 아이디 */}
      <div className="col-span-1 text-right">
        <span>대출 아이디</span> :
      </div>
      <div className="col-span-3 text-right text-xl font-bold">
        <p>{loan.id}</p>
      </div>
      <div className="col-span-2"></div>

      {/* 대출 이름 */}
      <div className="col-span-1 text-right">
        <span>대출명</span> :
      </div>
      <div className="col-span-3 text-right text-xl font-bold">
        <p>{loan.name}</p>
      </div>
      <div className="col-span-2"></div>

      {/* 추가 설명 */}
      <div className="col-span-1 text-right">
        <span>추가 설명</span> :
      </div>
      <div className="col-span-3 text-right">
        <p>{loan.description}</p>
      </div>
      <div className="col-span-2"></div>

      {/* 상환 종류 */}
      <div className="col-span-1 text-right">
        <span>상환 방식</span> :
      </div>
      <div className="col-span-3 text-right text-xl font-bold">
        <p>{parseRepaymentType(loan.repaymentType)}</p>
      </div>
      <div className="col-span-2"></div>

      {/* 대출 기간 */}
      <div className="col-span-1 text-right">
        <span>대출 기간</span> :
      </div>
      <div className="col-span-3 text-right text-xl font-bold">
        <span>{dayjs(loan.startDate).format('YYYY-MM-DD')}</span>
        <span> ~ </span>
        <span>{dayjs(loan.endDate).format('YYYY-MM-DD')}</span>
      </div>
      <div className="col-span-2"></div>

      {/* 납입일 */}
      <div className="col-span-1 text-right">
        <span>납입일</span> :
      </div>
      <div className="col-span-3 text-right text-xl font-bold">
        <p>{loan.repaymentDate} 일</p>
      </div>
      <div className="col-span-2"></div>

      {/* 이자 (%) */}
      <div className="col-span-1 text-right">
        <span>이자 (%)</span> :
      </div>
      <div className="col-span-3 text-right text-xl font-bold">
        <p>{Math.round(loan.interestRate * 10_000) / 100} %</p>
      </div>
      <div className="col-span-2"></div>

      {/* 총 대출 금액 */}
      <div className="col-span-1 text-right">
        <span>총 대출 금액</span> :
      </div>
      <div className="col-span-3 text-right text-xl font-bold">
        <p>{loan.totalBalance.toLocaleString()} 원</p>
      </div>
      <div className="col-span-2"></div>

      {/* 남은 금액 */}
      <div className="col-span-1 text-right">
        <span>남은 금액</span> :
      </div>
      <div className="col-span-3 text-right text-xl font-bold">
        <p>{loan.endingBalance.toLocaleString()} 원</p>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}
