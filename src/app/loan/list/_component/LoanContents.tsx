'use client';

import { useRouter } from 'next/navigation';

import useGetAllLoan from '@/hooks/loan/useGetAllLoan';

import dayjs from 'dayjs';

export default function LoanContents() {
  // router
  const router = useRouter();

  // query
  const { loans, isLoading } = useGetAllLoan();

  // handle
  const handleMoveDetail = (loanId: number) => {
    router.push(`/loan/${loanId}`);
  };

  return (
    <div className="rounded-xl p-8 shadow-2xl">
      <table className="table">
        {/* head */}
        <thead className="bg-base-300">
          <tr>
            <th className="text-center">번호</th>
            <th className="text-center">대출 이름</th>
            <th className="text-center">만료일</th>
            <th className="text-center">이자율</th>
            <th className="text-center">대출 금액</th>
            <th className="text-center">남은 금액</th>
            <th className="text-center">상환 수</th>
          </tr>
        </thead>
        {/* contents */}
        <tbody>
          {loans.map((loan, index) => (
            <tr key={`loan-row-${loan.id}`} className="hover cursor-pointer" onClick={() => handleMoveDetail(loan.id)}>
              <td className="text-right" width={50}>
                {index + 1}
              </td>
              <td width={200}>{loan.name}</td>
              <td className="text-center text-xs" width={170}>
                {dayjs(loan.endDate).format('YYYY-MM-DD')}
              </td>
              <td className="text-right" width={50}>
                {Math.round(loan.interestRate * 10_000) / 100} %
              </td>
              <td className="text-right" width={170}>
                {loan.totalBalance.toLocaleString()} 원
              </td>
              <td className="text-right" width={170}>
                {loan.endingBalance.toLocaleString()} 원
              </td>
              <td className="text-right" width={50}>
                {loan.repaymentCount} 회
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
