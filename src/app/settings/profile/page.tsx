import { cookies } from 'next/headers';

import { COOKIE_SESSION_ID, getUserInfo } from '@/utils/userUtils';

import ProfileDetail from './ProfileDetail';

export default async function ProfilePage() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get(COOKIE_SESSION_ID)?.value;

  const userInfo = await getUserInfo(sessionId);

  return (
    <main className="m-5 grid h-full w-full grid-cols-3 gap-10 p-10">
      {/* title */}
      <div className="col-span-3">
        <h1 className="text-xl font-semibold">프로필</h1>
      </div>
      <div className="divider col-span-3" />
      <ProfileDetail user={userInfo} />
    </main>
  );
}
