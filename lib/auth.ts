import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const adminUsername = process.env.ADMIN_USERNAME || 'rabbi';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Rabbi.@123';

        if (credentials.username !== adminUsername) return null;

        const isValid = credentials.password === adminPassword;
        if (!isValid) return null;

        return {
          id: '1',
          name: 'Admin',
          email: 'admin@argrabby.dev',
          username: adminUsername,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.username = (user as any).username;
      return token;
    },
    async session({ session, token }) {
      (session.user as any).username = token.username;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
