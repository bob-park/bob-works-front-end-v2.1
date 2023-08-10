import {
  DocumentApprovalLine,
  HolidayWorkReport,
  HolidayWorkUser,
} from '@/store/document/types';

import { formatDate, parseSubType, parseType } from '@/utils/ParseUtils';
import ApprovalLines, { ApprovalLine } from './ApprovalLines';
import Image from 'next/image';

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

const ExistWorkUserRow = ({
  user,
  workPurpose,
}: {
  user: HolidayWorkUser;
  workPurpose: string;
}) => {
  return (
    <tr className="border-b border-black h-[60px]">
      <td className="text-center text-lg border-r pb-2 border-black">
        {formatDate(user.workDate ?? new Date(), 'MM 월 dd 일')}
      </td>
      <td className="text-center w-[130px] border-r border-black pb-2">
        {user.times.map((time, i) => (
          <p key={`workTime_${user.workUserName}_${i}`}>
            <span>{time.startTime.substring(0, 5)}</span> ~{' '}
            <span>{time.endTime.substring(0, 5)}</span>
          </p>
        ))}
      </td>
      <td className="text-center text-lg w-[70px] border-r border-black pb-2">
        {user.totalWorkTime}
      </td>
      <td className="text-center border-r border-black pb-2">{workPurpose}</td>
      <td className="text-center font-bold border-r border-black pb-2">
        {user.workUserName}
      </td>
      <td className="text-center font-bold w-[80px] border-r border-black pb-2">
        {user.isVacation ? '유' : '무'}
      </td>
      <td className="text-center font-bold w-[80px] border-r border-black pb-2">
        {user.paymentTime}
      </td>
      <td></td>
    </tr>
  );
};

const EmptyWorkUserRow = () => {
  return (
    <tr className="border-b border-black h-[60px]">
      <td className="text-center text-lg border-r border-black"></td>
      <td className="text-center w-[130px] border-r border-black"></td>
      <td className="text-center text-lg w-[70px] border-r border-black"></td>
      <td className="text-center border-r border-black"></td>
      <td className="text-center font-bold border-r border-black"></td>
      <td className="text-center font-bold w-[80px] border-r border-black"></td>
      <td className="text-center font-bold w-[80px] border-r border-black"></td>
      <td></td>
    </tr>
  );
};

export default function HolidayWorkReportDocument({
  document,
  lines,
}: HolidayWorkReportDocumentProps) {
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
    <div
      id="holidayWorkReportDocument"
      className="relative w-[996px] m-[5px] py-5 text-black bg-white"
    >
      {document.status === 'CANCEL' && (
        <div className="absolute" style={{ top: '500px', left: '300px' }}>
          <div className="grid place-content-center w-full h-full opacity-50">
            <div className="text-red-700 font-black text-9xl tracking-widest -rotate-45 border-8 border-solid border-red-700 rounded p-10">
              취 소
            </div>
          </div>
        </div>
      )}
      <div className="m-5 grid grid-col-1 gap-10">
        <div className="grid w-full justify-end m-1">
          <ApprovalLines lines={dummyLines} />
        </div>

        {/* title */}
        <div className="flex w-full justify-center items-center mt-2">
          <h1 className="text-4xl font-bold underline">휴일 근무 보고서</h1>
        </div>

        {/* 작성일 */}
        <div className="flex w-full justify-end mt-3">
          <div className="text-xl font-medium tracking-widest ">
            작 성 일 :
            <span className="ml-10">
              {formatDate(document.createdDate, 'yyyy 년 MM 월 dd 일')}
            </span>
          </div>
        </div>

        {/* contents */}
        <table className="table-fixed border-2 border-black">
          <thead className="border-double border-b-2 border-black">
            <tr>
              <th
                rowSpan={2}
                className="border-r border-black pb-2 w-[120px] text-xl"
              >
                근무일
              </th>
              <th
                rowSpan={2}
                colSpan={2}
                className="border-r border-black pb-2 text-xl"
              >
                <p>근무시간</p>
                <p>(비행시간)</p>
              </th>
              <th
                rowSpan={2}
                className="border-r border-black pb-2 w-[280px] text-xl"
              >
                근무목적
              </th>
              <th
                rowSpan={2}
                className="border-r border-black pb-2 w-[100px] text-xl"
              >
                근무자
              </th>
              <th colSpan={2} className="border-r border-black pb-2">
                <p className="text-xl">휴개 대체</p>
                <p>(8시간 이상)</p>
              </th>
              <th rowSpan={2} className="text-xl pb-2">
                <p>본인</p>
                <p>확인</p>
              </th>
            </tr>
            <tr>
              <th className="border-t border-r border-black pb-2">
                <span className="text-lg">휴가</span>
                <span className="font-medium">(유/무)</span>
              </th>
              <th className="border-t border-r border-black pb-2">
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
