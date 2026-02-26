import { redirect } from 'next/navigation';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';

interface IProps {
  children: React.ReactNode;
}

export const ProtectedAuthorization = async ({ children }: IProps) => {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) return redirect('/login');

  const isAuthorized = session?.user?.role === 'ADMIN';

  if (!isAuthorized) return redirect('/');

  return children;
};

export default ProtectedAuthorization;