import BackDrop from '@/components/BackDrop';

import dayjs from 'dayjs';
import UsageVacationList from './_component/UsageVacationList';

export default function VacationUsagePage() {
  return (
    <div className="size-full">
      <div className="grid grid-cols-1 gap-10">
        {/* title */}
        <div>
          <div className="inline-block">
            <BackDrop />
            <span className="text-xl font-semibold ml-2">
              연차 사용 내역 (
              <span className="font-bold">{dayjs().format('YYYY')}</span>)
            </span>
          </div>
        </div>

        {/* content */}
        <UsageVacationList />
      </div>
    </div>
  );
}
