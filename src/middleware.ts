import { getCurrentUser } from '@/services/Auth';
import { NextRequest, NextResponse } from 'next/server';

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ['/sign-in', '/sign-up', '/forgot-password', '/otp'];

const roleBasedPrivateRoutes = {
  CLIENT: [
    /^\/guest-spots/,
    /^\/bookings/,
    /^\/booking-availablity/,
    /^\/booking/,
    /^\/review/,
    /^\/message/,
    /^\/favourites/,

    /^\/user-type-selection/,
    /^\/preference-selection/,
    /^\/preferences/,
    /^\/preferred-location/,
    /^\/preferred-service/,
    /^\/stay-updated/,
    /^\/all-set/,
    /^\/pending-approval/,
  ],
};

const profileCreationPaths = [
  '/user-type-selection',
  '/preference-selection',
  '/preferences',
  '/preferred-location',
  '/preferred-service',
  '/stay-updated',
  '/all-set',
];

export const middleware = async (request: NextRequest) => {
  const { origin, pathname } = request.nextUrl;
  const user = await getCurrentUser();

  if (!user) {
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

  if (!user.isProfile) {
    if (!profileCreationPaths.includes(pathname)) {
      return NextResponse.redirect(new URL('/user-type-selection', origin));
    }

    return NextResponse.next();
  }

  if (user.isProfile && !user.isActive) {
    if (pathname !== '/pending-approval') {
      return NextResponse.redirect(new URL('/pending-approval', origin));
    }

    return NextResponse.next();
  }

  if (
    user.isProfile &&
    user.isActive &&
    (profileCreationPaths.includes(pathname) ||
      pathname === '/pending-approval')
  ) {
    return NextResponse.redirect(new URL('/', origin));
  }

  if (user?.role && roleBasedPrivateRoutes[user?.role as Role]) {
    const routes = roleBasedPrivateRoutes[user?.role as Role];

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
    '/forgot-password',
    '/otp',

    '/guest-spots',
    '/bookings',
    '/booking-availablity/:page',
    '/booking/:page',
    '/review/:page',
    '/message',
    '/favourites',

    '/user-type-selection',
    '/preference-selection',
    '/preferences',
    '/preferred-location',
    '/preferred-service',
    '/stay-updated',
    '/all-set',
    '/pending-approval',

    // '/admin/:page',
    // '/user',
    // '/user/:page',
  ],
};
