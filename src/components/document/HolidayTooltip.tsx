import { useEffect } from 'react';

import { useGetHolidayWorkReports } from '@/hooks/document/document';
import { useHolidayWorkTimeLog } from '@/hooks/document/holidayWorkTime';

import cx from 'classnames';

type HolidayTooltipProps = {
  open: boolean;
  workTimeId: number;
};

export default function HolidayTooltip({ open, workTimeId }: HolidayTooltipProps) {
  // query
  const { logs } = useHolidayWorkTimeLog(workTimeId);

  // useEffect
  useEffect(() => {}, []);

  return (
    <div
      className={cx(
        'absolute flex flex-col items-center justify-start gap-2 rounded-2xl bg-base-300 p-5 text-sm shadow-2xl',
        open ? 'visible' : 'invisible',
      )}
    >
      {logs.map((log) => (
        <div key={`holiday_work_time_log_${log.id}`} className="w-full text-left">
          {log.calculationLog}
        </div>
      ))}
    </div>
  );
}
