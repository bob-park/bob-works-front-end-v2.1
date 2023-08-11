import BackDrop from '@/components/BackDrop';
import ApprovalHolidayWorkReportClient from './ApprovalHolidayWorkReportClient';

export default function ApprovalHolidayWorkReportPage({
  params,
}: {
  params: { approvalId: string };
}) {
  return (
    <main className="w-full h-full">
      <div className="grid grid-cols-1 gap-10">
        {/* title */}
        <div>
          <div className="inline-block">
            <BackDrop />
            <span className="text-xl font-semibold ml-2">결재</span>
          </div>
        </div>
        <ApprovalHolidayWorkReportClient approvalId={params.approvalId} />
      </div>
    </main>
  );
}
