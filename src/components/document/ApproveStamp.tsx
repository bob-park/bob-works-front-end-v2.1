type ApproveStampProps = {
  userId?: number;
};

const DefaultSignature = () => {
  return (
    <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-4 border-red-700">
      <span className="font-sans font-black text-red-700">결 제</span>
    </div>
  );
};

export default function ApproveStamp({ userId }: ApproveStampProps) {
  return (
    <div className="grid items-center justify-center">
      {userId ? (
        <img style={{ width: '80px' }} alt="signature" src={`/api/user/${userId}/document/signature`} />
      ) : (
        <DefaultSignature />
      )}
    </div>
  );
}
