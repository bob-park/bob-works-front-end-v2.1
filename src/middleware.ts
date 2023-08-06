import { NextRequest, NextResponse } from 'next/server';

const API_PREFIX = '/api';
const CLIENT_SERVICE_PATH = process.env.CLIENT_SERVICE_PATH;
const COOKIE_SESSION_ID = 'JSESSIONID';

async function apiCall(
  url: string,
  method: string,
  params?: URLSearchParams,
  body?: any,
  sessionId?: string,
) {
  const response = await fetch(`${CLIENT_SERVICE_PATH + url}?` + params, {
    method,
    body: JSON.stringify(body),
    headers: {
      Cookie: `${COOKIE_SESSION_ID}=${sessionId}`,
      'Content-Type': 'application/json',
    },
  });

  return response;
}

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  if (req.nextUrl.pathname.startsWith(API_PREFIX)) {
    const requestUrl = req.nextUrl.pathname.substring(API_PREFIX.length);

    const params = req.nextUrl.searchParams;

    let body;

    if (req.method === 'POST' || req.method === 'PUT') {
      body = await req.json();
    }

    const apiResponse = await apiCall(
      requestUrl,
      req.method,
      params,
      body,
      req.cookies.get(COOKIE_SESSION_ID)?.value,
    );

    if (apiResponse.status === 401) {
      return NextResponse.redirect(
        new URL('/api/oauth2/authorization/bob-works', req.url),
      );
    }

    return new NextResponse(apiResponse.body, {
      status: apiResponse.status,
      statusText: apiResponse.statusText,
    });

    // if (response.status === 401) {
    //   return NextResponse.redirect(
    //     new URL('/api/oauth2/authorization/bob-works', req.url),
    //   );
    // }
  }

  return response;
}
