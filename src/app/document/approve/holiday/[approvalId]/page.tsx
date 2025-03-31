import BackDrop from '@/components/BackDrop';

import ApprovalHolidayWorkReportClient from './ApprovalHolidayWorkReportClient';

export default function ApprovalHolidayWorkReportPage({ params }: { params: { approvalId: string } }) {
  return (
    <main className="h-full w-full">
      <div className="grid grid-cols-1 gap-10">
        {/* title */}
        <div>
          <div className="inline-block">
            <BackDrop />
            <span className="ml-2 text-xl font-semibold">결재</span>
          </div>
        </div>
        <ApprovalHolidayWorkReportClient approvalId={params.approvalId} />
      </div>
    </main>
  );
}
