'use server'

import bcrypt from 'bcryptjs'
import { prisma } from '@/prisma/prisma';
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
  try {
    prisma.$connect();
    await prisma.user.create({ data: { username, password: hashedPassword } });
  } catch (err) {
    console.warn(err);
    return {
      message: 'An error occurred while creating your account.',
    }
  } finally {
    prisma.$disconnect();
  }
}