import { cookies } from 'next/headers';
import { COOKIE_SESSION_ID, getUserInfo } from '@/utils/userUtils';

import UserDetail from './UsersDetail';

export default async function UserPage() {
  const sessionId = cookies().get(COOKIE_SESSION_ID)?.value;

  const userInfo = await getUserInfo(sessionId);

  return (
    <main className="grid grid-cols-3 gap-10 w-full h-full p-10 m-5">
      {/* title */}
      <div className="col-span-3">
        <h1 className="text-xl font-semibold">사용자 설정</h1>
      </div>
      <div className="col-span-3 divider" />

      <UserDetail user={userInfo} />
    </main>
  );
}
