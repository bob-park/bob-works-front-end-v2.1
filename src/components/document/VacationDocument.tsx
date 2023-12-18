import { DocumentApprovalLine, VacationDocument } from '@/store/document/types';
import ApprovalLines, { ApprovalLine } from './ApprovalLines';

import { formatDate, parseSubType, parseType } from '@/utils/ParseUtils';

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
          (<span>{formatDate(item.effectiveDate)}</span> -{' '}
          <span>{item.effectiveReason}</span>)
        </div>
      ))}
    </div>
  );
};

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
      className="relative w-[996px] m-[20px] px-10 py-5 text-black bg-white"
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
      <div className="m-20 grid grid-col-1 gap-10">
        <div className="grid w-full justify-end m-1">
          <ApprovalLines lines={dummyLines} />
        </div>

        <div className="flex w-full justify-center items-center">
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
          <div className="inline-block w-32 text-right mr-10 text-xl">
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
          <div className="inline-block w-32 text-right mr-10 text-xl">
            부 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;서 :
          </div>
          <span className="ml-10 text-xl font-semibold">
            {writer.team.name}
          </span>
        </div>
        <div>
          <div className="inline-block w-32 text-right mr-10 text-xl">
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
          <div className="inline-block w-32 text-right mr-10 text-xl">
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
            <span className="ml-4">
              (
              <span className="font-semibold">
                {` ${document.daysCount} 일 `}
              </span>
              )
            </span>
          </span>
        </div>
        <div className="">
          <div className="flex justify-start">
            <div className="flex-none w-[128px] text-xl text-right mr-10">
              휴 가 구 분 :
            </div>
            <div className="flex-initial w-full ml-10">
              <div className="flex justify-start gap-2 w-full">
                <div className="flex-none w-[135px] text-xl font-semibold">
                  <span>
                    {parseType(
                      document.vacationType,
                      document.vacationSubType != null,
                    )}
                  </span>

                  {document.vacationSubType && (
                    <span className="ml-2 text-sm">
                      ( {parseSubType(document.vacationSubType)} )
                    </span>
                  )}
                </div>
                <div className="flex-initial w-full">
                  {useAlternativeVacations && (
                    <UseAlternativeVacationList
                      useAlternativeVacations={useAlternativeVacations}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="inline-block w-32 text-right mr-10 text-xl">
            사 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;유 :
          </div>
          <span className="ml-10 text-xl">{document.reason}</span>
        </div>
        <div
          className="flex w-full justify-center items-center"
          style={{ margin: '60px 0px' }}
        >
          <h3 className="font-bold text-xl">
            위와 같이 신청하오니 재가 바랍니다.
          </h3>
        </div>

        <div className="text-right text-xl tracking-widest mt-10">
          <div className="inline-block w-32 mr-3">신 청 일 :</div>
          <div className="inline-block w-64">
            {formatDate(document.createdDate, 'yyyy 년  MM 월  dd 일 ')}
          </div>
        </div>
        <div className="text-right text-xl tracking-widest relative">
          <div className="inline-block w-32 mr-1">신 청 인 :</div>
          <div
            className="tracking-wide w-48 inline-block"
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
