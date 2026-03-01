'use client';

import UsersTable from './UsersTable'
import CreateUserForm from './CreateUserForm'
import { User } from '@/src/models/prisma/client';
import { useEffect, useState } from 'react';

export const UserSection = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const res = await fetch('/api/admin/user');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    if (users.length) return;
    getUsers();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl mb-4">Registered Users</h2>

        <UsersTable users={users} getUsers={getUsers} />       
      </div>
      
      <div className="flex flex-col gap-4">
        <h2 className="text-xl mb-4">Register new user</h2>

        <CreateUserForm getUsers={getUsers} />
      </div>    
    </>
  )
};

export default UserSection;