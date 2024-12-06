import BackDrop from '@/components/BackDrop';

import HolidayDetailClient from './HolidayDetailClient';

export default async function HolidayDetailPage(props: {
  params: Promise<{ holidayId: string }>;
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
        <HolidayDetailClient documentId={params.holidayId} />
      </div>
    </main>
  );
}
