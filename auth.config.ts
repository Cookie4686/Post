import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [Credentials({})],
  callbacks: {
    async signIn({ user }) {
      return !!user;
    },
  }
} satisfies NextAuthConfig;