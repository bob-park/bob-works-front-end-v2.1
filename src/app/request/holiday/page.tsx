import HolidayWorkReportClient from './HolidayWorkReportClient';

export default function HolidayWorkReportPage() {
  return (
    <main className="f-full w-full">
      <div className="grid grid-cols-1 gap-8">
        <div className="my-4">
          <h2 className="text-2xl font-bold">휴일 근무 보고서 신청</h2>
        </div>

        <HolidayWorkReportClient />
      </div>
    </main>
  );
}
