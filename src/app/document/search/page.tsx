import SearchDocumentClient from './SearchDocumentClient';

export default function SearchDocuments() {
  return (
    <main className="w-full h-full">
      <div className="grid grid-cols-1 gap-8"></div>

      <div className="my-4">
        <h2 className="text-2xl font-bold">결재 신청 목록</h2>
      </div>

      {/* contents */}
      <SearchDocumentClient />
    </main>
  );
}
