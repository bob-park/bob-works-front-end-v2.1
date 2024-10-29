import { formatDate, parseType } from '@/utils/ParseUtils';

import ApprovalLines, { ApprovalLine } from './ApprovalLines';

type VacationDocumentProps = {
  document?: VacationDocument;
  lines?: DocumentApprovalLine[];
  useAlternativeVacations?: AlternativeVacation[];
};

type UseAlternativeVacationListProps = {
  useAlternativeVacations: AlternativeVacation[];
};

const UseAlternativeVacationList = ({
  useAlternativeVacations,
}: UseAlternativeVacationListProps) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {useAlternativeVacations.map((item) => (
        <div key={`alternative_vacation_list_${item.id}`} className="text-xl">
          <span>{formatDate(item.effectiveDate)}</span> -{' '}
          <span>{item.effectiveReason}</span>
        </div>
      ))}
    </div>
  );
};

function parseDays(days: number, subType?: VacationSubType) {
  // if (days === 0.5) {
  //   return ` ${subType === 'AM' ? '오전' : '오후'} 반차 `;
  // }

  return `${days} 일`;
}

export default function VacationDocument({
  document,
  lines,
  useAlternativeVacations,
}: VacationDocumentProps) {
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

  return (
    <div
      id="vacationDocument"
      className="relative m-[20px] w-[996px] bg-white px-10 py-5 text-black"
    >
      {document.status === 'CANCEL' && (
        <div className="absolute" style={{ top: '500px', left: '300px' }}>
          <div className="grid h-full w-full place-content-center opacity-50">
            <div className="-rotate-45 rounded border-8 border-solid border-red-700 p-10 text-9xl font-black tracking-widest text-red-700">
              취 소
            </div>
          </div>
        </div>
      )}
      <div className="grid-col-1 m-20 grid gap-10">
        <div className="m-1 grid w-full justify-end">
          <ApprovalLines lines={dummyLines} />
        </div>

        <div className="flex w-full items-center justify-center">
          <h1
            className="font-bold"
            style={{
              margin: '50px 0px',
              fontSize: '2.8rem',
              letterSpacing: '20px',
              lineHeight: '2.5rem',
            }}
          >
            휴 가 계
          </h1>
        </div>
        <div className="" style={{ marginTop: '20px' }}>
          <div className="mr-10 inline-block w-32 text-right text-xl">
            성 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;명 :
          </div>
          <span
            className="ml-10 text-xl font-semibold"
            style={{ letterSpacing: '10px' }}
          >
            {writer.name}
          </span>
        </div>
        <div>
          <div className="mr-10 inline-block w-32 text-right text-xl">
            부 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;서 :
          </div>
          <span className="ml-10 text-xl font-semibold">
            {writer.team.name}
          </span>
        </div>
        <div>
          <div className="mr-10 inline-block w-32 text-right text-xl">
            직 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;급 :
          </div>
          <span
            className="ml-10 text-xl font-semibold"
            style={{ letterSpacing: '10px' }}
          >
            {writer.position?.name}
          </span>
        </div>
        <div>
          <div className="mr-10 inline-block w-32 text-right text-xl">
            휴 가 기 간 :
          </div>
          <span className="ml-10 text-xl font-normal tracking-widest">
            <span>
              {document.daysCount > 1
                ? `${formatDate(
                    document.vacationDateFrom as Date,
                  )} ~ ${formatDate(document.vacationDateTo as Date)}`
                : formatDate(document.vacationDateFrom as Date)}
            </span>
            {document.daysCount > 0.5 && (
              <span className="ml-4">
                (
                <span className="font-semibold">
                  {parseDays(document.daysCount, document.vacationSubType)}
                </span>
                )
              </span>
            )}
          </span>
        </div>
        <div className="">
          <div className="flex justify-start">
            <div className="mr-10 w-[128px] flex-none text-right text-xl">
              휴 가 구 분 :
            </div>
            <div className="ml-10 w-full flex-initial">
              <div className="flex w-full justify-start gap-2">
                <div className="w-[135px] flex-none text-xl font-semibold">
                  <span className="tracking-widest">
                    {parseType(document.vacationType, document.vacationSubType)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-start">
            <div className="mr-10 inline-block w-32 text-right text-xl">
              사 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;유 :
            </div>
            <div className="ml-10 text-xl">
              {document.vacationType === 'GENERAL' ? (
                <span className="">{document.reason}</span>
              ) : (
                <div className="w-full">
                  {useAlternativeVacations && (
                    <UseAlternativeVacationList
                      useAlternativeVacations={useAlternativeVacations}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="flex w-full items-center justify-center"
          style={{ margin: '60px 0px' }}
        >
          <h3 className="text-xl font-bold">
            위와 같이 신청하오니 재가 바랍니다.
          </h3>
        </div>

        <div className="mt-10 text-right text-xl tracking-widest">
          <div className="mr-3 inline-block w-32">신 청 일 :</div>
          <div className="inline-block w-64">
            {formatDate(document.createdDate, 'yyyy 년  MM 월  dd 일 ')}
          </div>
        </div>
        <div className="relative text-right text-xl tracking-widest">
          <div className="mr-1 inline-block w-32">신 청 인 :</div>
          <div
            className="inline-block w-48 tracking-wide"
            style={{ letterSpacing: '10px' }}
          >
            <span className="font-bold">
              {document.writer.name}

              <span
                className="font-normal"
                style={{ letterSpacing: '1px', marginLeft: '20px' }}
              >
                (인)
              </span>
            </span>
            <div
              className="absolute w-24"
              style={{
                right: '-20px',
                bottom: '-15px',
              }}
            >
              <img
                alt="signature"
                src={`/api/user/${document.writer.id}/document/signature`}
              />
            </div>
          </div>
        </div>
        <div className="mb-10"></div>
      </div>
    </div>
  );
}
