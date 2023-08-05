import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  if (req.nextUrl.pathname.startsWith('/api')) {
    // api call 중 unauthorized 발생시 로그인 페이지로 redirect
    if (response.status === 401) {
      return NextResponse.redirect(
        new URL('/api/oauth2/authorization/bob-works', req.url),
      );
    }
  }

  return response;
}

// export const config = {
//   matcher: ['/api:path*'],
// };
