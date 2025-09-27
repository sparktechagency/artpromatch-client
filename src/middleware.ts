import { getCurrentUser } from '@/services/Auth';
import { NextRequest, NextResponse } from 'next/server';

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ['/sign-in', '/sign-up'];

const roleBasedPrivateRoutes = {
  CLIENT: [/^\/guest-spots/, /^\/favourites/, /^\/bookings/],
};

export const middleware = async (request: NextRequest) => {
  const { origin, pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/sign-in?redirectPath=${pathname}`, origin)

        // `${origin}/sign-in?redirectPath=${pathname}`

        // new URL(`/sign-in?redirectPath=${pathname}`, request.url)

        // new URL(`${origin}/sign-in?redirectPath=${pathname}`, origin)
        // new URL(`${origin}/sign-in?redirectPath=${pathname}`, request.url)

        // new URL(
        //   `${origin}/sign-in?redirectPath=${encodeURIComponent(pathname)}`,
        //   origin
        // )

        // `${origin}/sign-in?redirectPath=${pathname}`
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];

    if (routes.some(route => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL('/', request.url));
};

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/guest-spots',
    '/favourites',
    '/bookings',
    // '/admin/:page',
    // '/user',
    // '/user/:page',
  ],
};
