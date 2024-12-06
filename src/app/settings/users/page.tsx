import { cookies } from 'next/headers';

import { COOKIE_SESSION_ID, getUserInfo } from '@/utils/userUtils';

import UserDetail from './UsersDetail';

export default async function UserPage() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get(COOKIE_SESSION_ID)?.value;

  const userInfo = await getUserInfo(sessionId);

  return (
    <main className="m-5 grid h-full w-full grid-cols-3 gap-10 p-10">
      {/* title */}
      <div className="col-span-3">
        <h1 className="text-xl font-semibold">사용자 설정</h1>
      </div>
      <div className="divider col-span-3" />

      <UserDetail user={userInfo} />
    </main>
  );
}
