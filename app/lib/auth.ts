'use server'

import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import { UserSchema } from "@/auth";

type FormState = {
  errors?: {
    username?: string[]
    password?: string[]
  }
  message?: string
} | undefined

export async function signUp(state: FormState, formData: FormData): Promise<FormState> {
  const parsedForm = UserSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })
  if (!parsedForm.success) {
    return { errors: parsedForm.error.flatten().fieldErrors, }
  }
  const { username, password } = parsedForm.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const prisma = new PrismaClient();
  try {
    prisma.$connect();
    await prisma.users.create({ data: { username, password: hashedPassword } });
  } catch (err) {
    console.warn(err);
    return {
      message: 'An error occurred while creating your account.',
    }
  } finally {
    prisma.$disconnect();
  }
}