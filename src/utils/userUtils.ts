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

export { CLIENT_SERVICE_PATH, COOKIE_SESSION_ID, getUserInfo };
