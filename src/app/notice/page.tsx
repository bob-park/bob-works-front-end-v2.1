import NoticeList from './NoticeList';

export default function NoticePage() {
  return (
    <main className="h-full w-full">
      <div className="grid grid-cols-1 gap-8">
        <div className="my-4">
          <h2 className="text-2xl font-bold">공지</h2>
        </div>
        {/* notice list */}
        <NoticeList />
      </div>
    </main>
  );
}
