import { useState } from 'react';

import HolidayTooltip from '@/components/document/HolidayTooltip';

import { formatDate } from '@/utils/ParseUtils';

import ApprovalLines, { ApprovalLine } from './ApprovalLines';

type HolidayWorkReportDocumentProps = {
  document?: HolidayWorkReport;
  lines?: DocumentApprovalLine[];
};

const emptyWorkUser: HolidayWorkUser = {
  isManualInput: false,
  workUserName: 'EMPTY',
  workDate: null,
  isVacation: false,
  times: [],
};

const ExistWorkUserRow = ({ user, workPurpose }: { user: HolidayWorkUser; workPurpose: string }) => {
  // state
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  return (
    <tr className="h-[60px] border-b border-black">
      <td className="border-r border-black pb-2 text-center text-lg">
        {formatDate(user.workDate ?? new Date(), 'MM 월 dd 일')}
      </td>
      <td className="w-[130px] border-r border-black pb-2 text-center">
        {user.times.map((time, i) => (
          <p key={`workTime_${user.workUserName}_${i}`}>
            <span>{time.startTime.substring(0, 5)}</span> ~ <span>{time.endTime.substring(0, 5)}</span>
          </p>
        ))}
      </td>
      <td
        className="w-[70px] border-r border-black pb-2 text-center text-lg"
        onMouseEnter={() => setOpenTooltip(true)}
        onMouseLeave={() => setOpenTooltip(false)}
      >
        <div>{user.totalWorkTime}</div>
        {user.times[0].id && <HolidayTooltip open={openTooltip} workTimeId={user.times[0].id} />}
      </td>
      <td className="border-r border-black pb-2 text-center">{workPurpose}</td>
      <td className="border-r border-black pb-2 text-center font-bold">{user.workUserName}</td>
      <td className="w-[80px] border-r border-black pb-2 text-center font-bold">{user.isVacation ? '유' : '무'}</td>
      <td className="w-[80px] border-r border-black pb-2 text-center font-bold">{user.paymentTime}</td>
      <td></td>
    </tr>
  );
};

const EmptyWorkUserRow = () => {
  return (
    <tr className="h-[60px] border-b border-black">
      <td className="border-r border-black text-center text-lg"></td>
      <td className="w-[130px] border-r border-black text-center"></td>
      <td className="w-[70px] border-r border-black text-center text-lg"></td>
      <td className="border-r border-black text-center"></td>
      <td className="border-r border-black text-center font-bold"></td>
      <td className="w-[80px] border-r border-black text-center font-bold"></td>
      <td className="w-[80px] border-r border-black text-center font-bold"></td>
      <td></td>
    </tr>
  );
};

export default function HolidayWorkReportDocument({ document, lines }: HolidayWorkReportDocumentProps) {
  if (!document || !lines) {
    return;
  }

  const { writer } = document;

  // TODO 현재 문서를 회사에서 사용하는 문서로 만들어야되서 이렇게 했다. 나중에 바꿔야징...
  const dummyLines: ApprovalLine[] = lines.map((line) => ({
    id: line.id,
    uniqueUserId: line.uniqueUserId,
    positionName: '부 서 장',
    status: line.status,
    approveDate: line.approvedDateTime,
    reason: line.reason,
  }));

  dummyLines.unshift({
    id: 101,
    uniqueUserId: writer.id,
    positionName: '담 당',
    status: 'APPROVE',
    approveDate: document.createdDate,
  });

  const emptyUsers = Array(13 - document.users.length).fill(emptyWorkUser);

  const workUsers: HolidayWorkUser[] = [...document.users, ...emptyUsers];

  return (
    <div id="holidayWorkReportDocument" className="relative m-[5px] w-[996px] bg-white py-5 text-black">
      {document.status === 'CANCEL' && (
        <div className="absolute" style={{ top: '500px', left: '300px' }}>
          <div className="grid h-full w-full place-content-center opacity-50">
            <div className="-rotate-45 rounded border-8 border-solid border-red-700 p-10 text-9xl font-black tracking-widest text-red-700">
              취 소
            </div>
          </div>
        </div>
      )}
      <div className="grid-col-1 m-5 grid gap-10">
        <div className="m-1 grid w-full justify-end">
          <ApprovalLines lines={dummyLines} />
        </div>

        {/* title */}
        <div className="mt-2 flex w-full items-center justify-center">
          <h1 className="text-4xl font-bold underline">휴일 근무 보고서</h1>
        </div>

        {/* 작성일 */}
        <div className="mt-3 flex w-full justify-end">
          <div className="text-xl font-medium tracking-widest">
            작 성 일 :<span className="ml-10">{formatDate(document.createdDate, 'yyyy 년 MM 월 dd 일')}</span>
          </div>
        </div>

        {/* contents */}
        <table className="table-fixed border-2 border-black">
          <thead className="border-b-2 border-double border-black">
            <tr>
              <th rowSpan={2} className="w-[120px] border-r border-black pb-2 text-xl">
                근무일
              </th>
              <th rowSpan={2} colSpan={2} className="border-r border-black pb-2 text-xl">
                <p>근무시간</p>
                <p>(비행시간)</p>
              </th>
              <th rowSpan={2} className="w-[280px] border-r border-black pb-2 text-xl">
                근무목적
              </th>
              <th rowSpan={2} className="w-[100px] border-r border-black pb-2 text-xl">
                근무자
              </th>
              <th colSpan={2} className="border-r border-black pb-2">
                <p className="text-xl">휴개 대체</p>
                <p>(8시간 이상)</p>
              </th>
              <th rowSpan={2} className="pb-2 text-xl">
                <p>본인</p>
                <p>확인</p>
              </th>
            </tr>
            <tr>
              <th className="border-r border-t border-black pb-2">
                <span className="text-lg">휴가</span>
                <span className="font-medium">(유/무)</span>
              </th>
              <th className="border-r border-t border-black pb-2">
                <p>수당</p>
                <p>적용 시간</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {workUsers.map((user, i) =>
              user.workUserName !== 'EMPTY' ? (
                <ExistWorkUserRow
                  key={`holidayWorkReportWorkUser_${i}`}
                  user={user}
                  workPurpose={document.workPurpose}
                />
              ) : (
                <EmptyWorkUserRow key={`holidayWorkReportWorkUser_${i}`} />
              ),
            )}
          </tbody>
        </table>

        {/* logo */}
        <div className="flex justify-start gap-5">
          <img className="ml-5 w-[200px]" src="/malgn_logo.png" alt="logo" />
        </div>
      </div>
    </div>
  );
}
