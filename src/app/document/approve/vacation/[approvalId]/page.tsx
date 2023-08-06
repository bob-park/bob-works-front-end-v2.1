import BackDrop from '@/components/BackDrop';
import ApprovalVacationDetail from './ApprovalVacationDetail';

export default function ApprovalVacationDetailPage({
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
        <ApprovalVacationDetail approvalId={params.approvalId} />
      </div>
    </main>
  );
}
