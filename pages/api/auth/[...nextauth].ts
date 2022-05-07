import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import http from 'lib/http';
import prisma from 'prisma/prisma.mjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, {
    providers: [
      Credentials({
        name: 'Credentials',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        async authorize(credentials: any) {
          console.log({ credentials });

          const response = await http.post('/auth/signin/credentials', {
            email: credentials.email,
            password: credentials.password,
          });

          console.log(response);
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.AUTH_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    adapter: PrismaAdapter(prisma),
    pages: {
      signIn: '/signin',
      signOut: '/signOut',
    },
    callbacks: {
      async signIn(params) {
        console.log({ params });
        return true;
      },
      async session(params) {
        console.log({ params });
        return params.session;
      },
    },
  });
}

export default handler;
