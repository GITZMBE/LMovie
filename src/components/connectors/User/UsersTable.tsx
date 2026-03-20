"use client";

import { User } from "@/src/models/prisma/client";
import UserItem from "./UserItem";

interface Props {
  users: User[];
  getUsers: () => Promise<void>;
}

export function UsersTable({ users, getUsers }: Props) {
  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <UserItem key={user.id} user={user} getUsers={getUsers} />
      ))}
    </ul>
  );
};

export default UsersTable;