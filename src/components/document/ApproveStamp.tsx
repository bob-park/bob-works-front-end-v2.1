type ApproveStampProps = {
  userId?: number;
};

const DefaultSignature = () => {
  return (
    <div className="flex w-[60px] h-[60px] justify-center items-center border-4 border-red-700 rounded-full">
      <span className="text-red-700 font-black font-sans">결 제</span>
    </div>
  );
};

export default function ApproveStamp({ userId }: ApproveStampProps) {
  return (
    <div className="grid justify-center items-center">
      {userId ? (
        <img
          style={{ width: '80px' }}
          alt="signature"
          src={`/api/user/${userId}/document/signature`}
        />
      ) : (
        <DefaultSignature />
      )}
    </div>
  );
}
