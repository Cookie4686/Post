import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs'
import { z } from 'zod'

export const UserSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim()
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const parsedCredentials = UserSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);
          if (user && await bcrypt.compare(password, user.password)) {
            console.log("log in successful");
            return user;
          }
        }
        console.log("invalid");
        return null;
      },
    }),
  ],
})

async function getUser(username: string) {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    return await prisma.users.findUnique({ where: { username } });
  } catch (err) {
    console.warn(err);
  } finally {
    prisma.$disconnect();
  }
}