import BackDrop from '@/components/BackDrop';

import VacationDetail from './VacationDetail';

export default async function VacationDetailPage(props: {
  params: Promise<{ vacationId: string }>;
}) {
  const params = await props.params;
  return (
    <main className="h-full w-full">
      <div className="grid grid-cols-1 gap-10">
        {/* title */}
        <div>
          <div className="inline-block">
            <BackDrop />
            <span className="ml-2 text-xl font-semibold">상세</span>
          </div>
        </div>

        <VacationDetail documentId={params.vacationId} />
      </div>
    </main>
  );
}
