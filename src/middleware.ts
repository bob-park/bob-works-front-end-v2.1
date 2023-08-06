import { NextRequest, NextResponse } from 'next/server';

// * url
const API_PREFIX = '/api';
const AUTH_URL = '/api/oauth2/authorization/bob-works';
const LOGOUT_URL = '/api/logout';

const CLIENT_SERVICE_PATH = process.env.CLIENT_SERVICE_PATH;

const AUTH_UNCHECK_URLS = [AUTH_URL];

function checkedAuth(url: string) {
  if (AUTH_UNCHECK_URLS.some((checkedUrl) => checkedUrl == url)) {
    return false;
  }

  return url.startsWith(API_PREFIX);
}

async function apiCall(
  url: string,
  method: string,
  headers: Headers,
  params?: URLSearchParams,
  body?: any,
) {
  const response = await fetch(
    `${CLIENT_SERVICE_PATH + url}${params ? `?${params}` : ''}`,
    {
      method,
      headers: {
        Cookie: headers.get('Cookie') || '',
        'Content-Type': headers.get('Content-Type') || '',
      },
      body,
    },
  );

  return response;
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const response = NextResponse.next();

  if (checkedAuth(pathname)) {
    const requestUrl = pathname.substring(API_PREFIX.length);

    const params = req.nextUrl.searchParams;

    const body = req.body;

    const apiResponse = await apiCall(
      requestUrl,
      req.method,
      req.headers,
      params,
      body,
    );

    if (apiResponse.status === 401) {
      return NextResponse.redirect(
        new URL('/api/oauth2/authorization/bob-works', req.url),
      );
    }

    if (pathname.startsWith(LOGOUT_URL)) {
      return NextResponse.redirect(
        new URL('/api/oauth2/authorization/bob-works', req.url),
      );
    }

    return new NextResponse(apiResponse.body, {
      status: apiResponse.status,
      statusText: apiResponse.statusText,
    });
  }

  return response;
}
