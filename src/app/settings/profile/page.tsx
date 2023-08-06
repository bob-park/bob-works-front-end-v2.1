import { cookies } from 'next/headers';
import ProfileDetail from './ProfileDetail';

const CLIENT_SERVICE_PATH = process.env.CLIENT_SERVICE_PATH;
const COOKIE_SESSION_ID = 'JSESSIONID';

async function getUserInfo(sessionId?: string): Promise<User> {
  const user = await fetch(CLIENT_SERVICE_PATH + '/user', {
    method: 'get',
    headers: {
      Cookie: `${COOKIE_SESSION_ID}=${sessionId}`,
    },
  }).then((res) => res.json());

  return user;
}

export default async function ProfilePage() {
  const sessionId = cookies().get(COOKIE_SESSION_ID)?.value;

  const userInfo = await getUserInfo(sessionId);

  return (
    <main className="grid grid-cols-3 gap-10 w-full h-full p-10 m-5">
      {/* title */}
      <div className="col-span-3">
        <h1 className="text-xl font-semibold">프로필</h1>
        <div className="divider" />
      </div>
      <ProfileDetail user={userInfo} />
    </main>
  );
}
