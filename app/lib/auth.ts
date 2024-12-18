'use server'

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs'
import prisma from '@/prisma/prisma';
import { signIn, UserSchema } from "@/auth";

export type FormState = {
  errors?: {
    username?: string[]
    password?: string[]
  }
  message?: string
} | undefined

export async function logIn(state: FormState, formData: FormData): Promise<FormState> {
  const parsedForm = UserSchema.safeParse({
    name: formData.get('name'),
    password: formData.get('password'),
  });
  if (parsedForm.success) {
    const { name, password } = parsedForm.data;
    try {
      await signIn("credentials", { name, password, redirect: false });
    } catch (err) {
      console.warn(err);
      return {
        message: 'An error occurred while logging in.',
      }
    }
  } else {
    return { errors: parsedForm.error.flatten().fieldErrors }
  }
  const redirectUrl = formData.get('redirectUrl') as string;
  redirect(redirectUrl);
}


export async function signUp(state: FormState, formData: FormData): Promise<FormState> {
  const parsedForm = UserSchema.safeParse({
    name: formData.get('name'),
    password: formData.get('password'),
  })
  if (parsedForm.success) {
    const { name, password } = parsedForm.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await prisma.$connect();
      await prisma.user.create({ data: { name, password: hashedPassword } });
      await signIn("credentials", { name, password, redirect: false });
    } catch {
      return {
        message: 'An error occurred while creating your account.',
      }
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return { errors: parsedForm.error.flatten().fieldErrors }
  }
  const redirectUrl = formData.get('redirectUrl') as string;
  redirect(redirectUrl);
}