import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [Credentials({})],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    }, session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
} satisfies NextAuthConfig;