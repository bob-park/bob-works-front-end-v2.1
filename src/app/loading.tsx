export default function GlobalLoading() {
  return (
    <div className="flex items-center gap-x-2">
      <span className="loading loading-infinity loading-lg" />
      <h4 className="text-xl font-bold">loading...</h4>
    </div>
  );
}
