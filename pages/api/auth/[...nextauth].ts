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
        async authorize(credentials: any) {
          const response = await http.post('http://localhost:3000/api/auth/signin/credentials', {
            email: credentials.email,
            password: credentials?.password,
          });

          if (response.error) {
            return null;
          }

          return response.user;
        },
        credentials: {
          username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
          password: { label: 'Password', type: 'password' },
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.AUTH_SECRET,
    session: {
      strategy: 'jwt',
    },
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
        return true;
      },
      async session({ session, token }: any) {
        session.user = token.user;
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.user = user;
        }
        return token;
      },
    },
  });
}

export default handler;
