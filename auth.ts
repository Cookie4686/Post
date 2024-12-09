import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import prisma from "@/prisma/prisma"
import { authConfig } from "@/auth.config"

export const UserSchema = z.object({
  name: z.string().trim(),
  password: z.string().trim()
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const parsedCredentials = UserSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const { name, password } = parsedCredentials.data;
          const user = await getUser(name);
          if (user && await bcrypt.compare(password, user.password)) {
            console.log("log in successful");
            return user;
          }
        }
        console.warn("log in unsuccessful");
        return null;
      },
    }),
  ],
})

async function getUser(name: string) {
  try {
    await prisma.$connect();
    return await prisma.user.findUnique({ where: { name } })
  } catch (err) {
    console.warn(err);
  } finally {
    await prisma.$disconnect();
  }
}