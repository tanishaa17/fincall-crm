import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  if (!token) {
    redirect('/auth/login');
    return null;
  }

  const role = cookieStore.get('role')?.value;
  if (role === 'employee') {
    redirect('/dashboard/employee');
  } else {
    redirect('/dashboard/admin');
  }
  return null;
}
