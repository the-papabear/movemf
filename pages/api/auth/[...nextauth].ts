import { NextApiRequest, NextApiResponse } from 'next';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions, SessionStrategy } from 'next-auth';

import { mongoClient } from 'backend/mongoConnection';

const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  adapter: MongoDBAdapter(mongoClient()),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      authorize: async (credentials): Promise<any> => {},
      credentials: {
        email: {
          type: 'text',
          label: 'Email',
          placeholder: 'Type in your email',
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: 'Type in your password',
        },
      },
    }),
  ],
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, options);
}
