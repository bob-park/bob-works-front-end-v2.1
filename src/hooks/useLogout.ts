import { useRouter } from 'next/router';

const logoutUrl = '/api/logout';

export default function useLogout() {
  const router = useRouter();

  return () => router.push(logoutUrl);
}
