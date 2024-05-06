'use client';

import dayjs from 'dayjs';

type LoanDetailContentsProps = {
  loan: Loan;
};

export default function LoanDetailContents({ loan }: LoanDetailContentsProps) {
  return (
    <div className="w-full grid grid-cols-5 gap-6 rounded-2xl shadow-xl p-10">
      {/* 대출 아이디 */}
      <div className="col-span-1 text-right">
        <span>대출 아이디</span> :
      </div>
      <div className="col-span-4 text-xl font-bold">
        <p>{loan.id}</p>
      </div>

      {/* 대출 이름 */}
      <div className="col-span-1 text-right">
        <span>대출명</span> :
      </div>
      <div className="col-span-4 text-xl font-bold">
        <p>{loan.name}</p>
      </div>

      {/* 추가 설명 */}
      <div className="col-span-1 text-right">
        <span>추가 설명</span> :
      </div>
      <div className="col-span-4">
        <p>{loan.description}</p>
      </div>

      {/* 대출 기간 */}
      <div className="col-span-1 text-right">
        <span>대출 기간</span> :
      </div>
      <div className="col-span-4 text-xl font-bold">
        <span>{dayjs(loan.startDate).format('YYYY-MM-DD')}</span>
        <span> ~ </span>
        <span>{dayjs(loan.endDate).format('YYYY-MM-DD')}</span>
      </div>

      {/* 이자 (%) */}
      <div className="col-span-1 text-right">
        <span>이자 (%)</span> :
      </div>
      <div className="col-span-2 text-right text-xl font-bold">
        <p>{Math.round(loan.interestRate * 10_000) / 100} %</p>
      </div>
      <div className="col-span-2"></div>

      {/* 총 대출 금액 */}
      <div className="col-span-1 text-right">
        <span>총 대출 금액</span> :
      </div>
      <div className="col-span-2 text-right text-xl font-bold">
        <p>{loan.totalBalance.toLocaleString()} 원</p>
      </div>
      <div className="col-span-2"></div>

      {/* 남은 금액 */}
      <div className="col-span-1 text-right">
        <span>남은 금액</span> :
      </div>
      <div className="col-span-2 text-right text-xl font-bold">
        <p>{loan.endingBalance.toLocaleString()} 원</p>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}
