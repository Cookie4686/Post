'use server'

import { cookies } from "next/headers";

export async function setTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');
  cookieStore.set({ name: 'theme', value: theme && theme.value == 'dark' ? 'light' : 'dark' });
}