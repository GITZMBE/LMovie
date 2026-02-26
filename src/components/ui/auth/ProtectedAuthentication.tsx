import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

export const ProtectedAuthentication = async ({ children }: IProps) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return redirect('/login');

  return children;
};

export default ProtectedAuthentication;