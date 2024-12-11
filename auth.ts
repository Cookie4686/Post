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
            console.log(`user-(${user.name}) log in successful`);
            return { id: user.id, name: user.name };
          }
          console.warn(`user-(${name}) unsuccessful log in`);
        } else {
          console.warn("invalid log in credentials");
        }
        return null;
      },
    }),
  ],
})

async function getUser(name: string) {
  try {
    return await prisma.user.findUnique({ select: { id: true, name: true, password: true }, where: { name } })
  } catch (err) {
    console.warn(`Get user-(${name}) failed`);
    console.warn(err);
  }
}