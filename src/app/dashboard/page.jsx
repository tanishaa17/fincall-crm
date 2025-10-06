import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  if (!token) {
    redirect('/auth/login');
    return null;
  }
  // TODO: Check user role and redirect accordingly
  redirect('/dashboard/admin');
  return null;
}
