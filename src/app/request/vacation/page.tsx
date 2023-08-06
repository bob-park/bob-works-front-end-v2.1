import RequestVacationClient from './RequestVacationClient';

export default function RequestVacation() {
  return (
    <main className="w-full f-full">
      <div className="grid grid-cols-1 gap-8">
        <div className="my-4">
          <h2 className="text-2xl font-bold">휴가계 신청</h2>
        </div>

        <RequestVacationClient />
      </div>
    </main>
  );
}
