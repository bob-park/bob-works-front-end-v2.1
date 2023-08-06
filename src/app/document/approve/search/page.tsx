import SearchDocumentApprovalClient from './SearchDocumentApporvalClient';

export default function ApproveDocumentSearchPage() {
  return (
    <main className="w-full h-full">
      <div className="grid grid-cols-1 gap-8"></div>

      <div className="my-4">
        <h2 className="text-2xl font-bold">결재 대기 목록</h2>
      </div>

      <SearchDocumentApprovalClient />
    </main>
  );
}
