import BackDrop from '@/components/BackDrop';
import VacationDetail from './VacationDetail';

export default function VacationDetailPage({
  params,
}: {
  params: { vacationId: string };
}) {
  return (
    <main className="w-full h-full">
      <div className="grid grid-cols-1 gap-10">
        {/* title */}
        <div>
          <div className="inline-block">
            <BackDrop />
            <span className="text-xl font-semibold ml-2">상세</span>
          </div>
        </div>

        <VacationDetail documentId={params.vacationId} />
      </div>
    </main>
  );
}
