export { default } from 'next-auth/middleware';

export const config = { matcher: '/((?!api|signin|_next/static|_next/image|favicon.ico).*)' };
