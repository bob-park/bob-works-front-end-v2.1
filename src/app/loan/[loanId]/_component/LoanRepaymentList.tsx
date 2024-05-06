'use client';

import dayjs from 'dayjs';

type LoanRepaymentListProps = {
  list: LoanRepaymentHistory[];
};

export default function LoanRepaymentList({ list }: LoanRepaymentListProps) {
  return (
    <div className="w-full grid grid-cols-1 gap-6 rounded-2xl shadow-xl p-8">
      <div className="">
        <h2 className="text-xl font-bold">대출 상환 내역</h2>
      </div>
      <div>
        <table className="table">
          {/* head */}
          <thead className="bg-base-300 text-center">
            <tr>
              <th className="">아이디</th>
              <th className="">회차</th>
              <th className="">원금</th>
              <th className="">이자</th>
              <th className="">총 납부 금액</th>
              <th className="">납부일</th>
            </tr>
          </thead>

          {/* contents */}
          <tbody>
            {list.map((item) => (
              <tr key={`loan-repayment-${item.id}`} className="hover">
                <td className="text-right" width={50}>
                  {item.id}
                </td>
                <td className="text-right" width={50}>
                  {item.round}
                </td>
                <td className="text-right" width={150}>
                  {item.principal.toLocaleString()} 원
                </td>
                <td className="text-right" width={150}>
                  {item.interest.toLocaleString()} 원
                </td>
                <td className="text-right" width={150}>
                  {(item.principal + item.interest).toLocaleString()} 원
                </td>
                <td className="text-center">
                  {item.repaymentDate ? (
                    <span>
                      {dayjs(item.repaymentDate).format('YYYY-MM-DD')}
                    </span>
                  ) : (
                    <button className="btn btn-primary btn-sm" type="button">
                      납부하기
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
