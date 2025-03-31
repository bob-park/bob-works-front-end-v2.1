import { format } from 'date-fns';
import { Tooltip } from 'react-daisyui';

import ApproveStamp from './ApproveStamp';
import RejectStamp from './RejectStamp';

export type ApprovalLine = {
  id: number;
  uniqueUserId?: number;
  positionName: string;
  status: DocumentsStatus;
  approveDate?: Date;
  reason?: string;
};

type ApprovalLinesProps = {
  lines: ApprovalLine[];
};

const Stamp = ({
  userId,
  status,
  approveDate,
  reason,
}: {
  userId?: number;
  status?: DocumentsStatus;
  approveDate?: Date;
  reason?: string;
}) => {
  if (!status || !approveDate) {
    return null;
  }

  return (
    <div className="grid items-center justify-center">
      <Tooltip message={`${format(new Date(approveDate), 'yyyy-MM-dd HH:mm:ss')} ${reason || ''}`} position="bottom">
        {status === 'APPROVE' && <ApproveStamp userId={userId} />}
        {status === 'REJECT' && <RejectStamp />}
      </Tooltip>
    </div>
  );
};

export default function ApprovalLines({ lines }: ApprovalLinesProps) {
  return (
    <table className="text-center font-bold" style={{ border: '1px solid black' }}>
      <tbody className="">
        <tr className="">
          <td
            className="px-1"
            rowSpan={2}
            style={{
              writingMode: 'vertical-lr',
              height: '120px',
              letterSpacing: '2px',
              borderRight: '1px solid black',
              paddingBottom: '4px',
            }}
          >
            신 청
          </td>
          {lines.map((line) => (
            <td
              key={`head_${line.id}`}
              className="px-1"
              style={{
                width: '100px',
                height: '15px',
                letterSpacing: '2px',
                borderRight: '1px solid black',
                borderBottom: '1px solid black',
                paddingBottom: '10px',
              }}
            >
              {line.positionName}
            </td>
          ))}
          <td
            rowSpan={2}
            className="px-1"
            style={{
              writingMode: 'vertical-lr',
              height: '120px',
              letterSpacing: '2px',
              borderRight: '1px solid black',
              paddingBottom: '4px',
            }}
          >
            승 인
          </td>
          <td
            className=""
            style={{
              width: '100px',
              height: '15px',
              letterSpacing: '2px',
              borderBottom: '1px solid black',
              paddingBottom: '10px',
            }}
          >
            대표이사
          </td>
        </tr>
        <tr className="h-[80px]">
          {lines.map((line) => (
            <td
              key={`body_${line.id}`}
              className=""
              style={{
                borderRight: '1px solid black',
              }}
            >
              <Stamp
                userId={line.uniqueUserId}
                status={line.status}
                approveDate={line.approveDate}
                reason={line.reason}
              />
            </td>
          ))}
          <td className=""></td>
        </tr>
      </tbody>
    </table>
  );
}
