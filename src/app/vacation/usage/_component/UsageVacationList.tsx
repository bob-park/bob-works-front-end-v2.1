'use client';

import useGetVacationUsage from '@/hooks/document/useGetVacationUsage';

import dayjs from 'dayjs';

function parseVacationType(type: VacationType) {
  switch (type) {
    case 'GENERAL':
      return '연차';
    case 'ALTERNATIVE':
      return '대체 휴가';
    default:
      return '뭘까?';
  }
}

function parseVacationSubType(subType: VacationSubType) {
  switch (subType) {
    case 'AM':
      return '오전';
    case 'PM':
      return '오후';
    default:
      return '뭘까?';
  }
}

export default function UsageVacationList() {
  const { usageVacations, isLoading } = useGetVacationUsage();

  return (
    <div className="w-full grid grid-cols-1 gap-6 rounded-2xl shadow-xl p-8">
      {/* 사용 걔수 */}
      <div className="w-full">
        <div className="flex flex-row gap-4 items-center">
          <div className="">총 사용 개수</div>:
          <div className="text-lg font-bold">
            <span>
              {usageVacations
                .map((item) => item.daysCount)
                .reduce((patialSum, a) => patialSum + a, 0)}
            </span>
            <span> 개</span>
          </div>
        </div>
      </div>

      <div>
        <table className="table">
          {/* head */}
          <thead className="bg-base-300 text-center">
            <tr>
              <th>번호</th>
              <th>종류</th>
              <th>사용 개수</th>
              <th>기간</th>
              <th>사유</th>
              <th>비고</th>
            </tr>
          </thead>

          {/* contents */}
          <tbody>
            {usageVacations.map((item, index) => (
              <tr key={`usage-vacation-${item.id}`} className="hover">
                <td className="text-right" width={50}>
                  {index + 1}
                </td>
                <td className="text-center" width={200}>
                  {parseVacationType(item.vacationType)}{' '}
                  {item.vacationSubType && (
                    <span>({parseVacationSubType(item.vacationSubType)})</span>
                  )}
                </td>
                <td className="text-center" width={150}>
                  {item.daysCount}
                </td>
                <td className="text-center" width={250}>
                  {item.daysCount > 0.5 ? (
                    <div>
                      <span>
                        {dayjs(item.vacationDateFrom).format('YYYY-MM-DD')}
                      </span>
                      <span> ~ </span>
                      <span>
                        {dayjs(item.vacationDateTo).format('YYYY-MM-DD')}
                      </span>
                    </div>
                  ) : (
                    <div>
                      {dayjs(item.vacationDateFrom).format('YYYY-MM-DD')}
                    </div>
                  )}
                </td>
                <td className="text-center" width={150}>
                  {item.reason}
                </td>
                <td className="text-center" width={300}>
                  {item.alternativeVacations?.map((alter) => (
                    <p key={`usage-vacation-alter-${alter.id}`}>
                      <span>
                        {dayjs(alter.effectiveDate).format('YYYY-MM-DD')}
                      </span>
                      <span> - </span>
                      <span>{alter.effectiveReason}</span>
                    </p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
