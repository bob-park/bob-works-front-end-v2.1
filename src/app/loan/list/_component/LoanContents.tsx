'use client';

import useGetAllLoan from '@/hooks/loan/useGetAllLoan';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

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
    <div className="rounded-xl shadow-2xl p-8">
      <table className="table ">
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
            <tr
              key={`loan-row-${loan.id}`}
              className="hover cursor-pointer"
              onClick={() => handleMoveDetail(loan.id)}
            >
              <td className="text-right">{index + 1}</td>
              <td width={150}>{loan.name}</td>
              <td className="text-center" width={120}>
                {dayjs(loan.endDate).format('YYYY-MM-DD')}
              </td>
              <td className="text-right" width={100}>
                {Math.round(loan.interestRate * 10_000) / 100} %
              </td>
              <td>{loan.totalBalance.toLocaleString()} 원</td>
              <td>{loan.endingBalance.toLocaleString()} 원</td>
              <td className="text-right">{loan.repaymentCount} 회</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
