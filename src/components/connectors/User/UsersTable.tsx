"use client";

import { useToast } from "@/src/hooks";
import { User } from "@/src/models/prisma/client";
import { useState } from "react";

interface Props {
  users: User[];
  getUsers: () => Promise<void>;
}

export function UsersTable({ users, getUsers }: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const { showToast } = useToast();

  async function deleteUser(id: string) {
    try {
      setLoading(id);

      const res = await fetch(`/api/admin/user/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error("Failed to delete user");
      }

      showToast('User deleted', 'success');
      getUsers();
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoading(null);
    }
  }

  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex justify-between items-center p-3 bg-zinc-900 rounded border border-white/10"
        >
          <div>
            <p className="text-sm">{user.email}</p>
            <p className="text-xs text-zinc-400">{user.role}</p>
          </div>

          {user.role !== "ADMIN" && (
            <button
              onClick={() => deleteUser(user.id)}
              disabled={loading === user.id}
              className="
                px-3 py-1 text-sm
                bg-red-600/80
                hover:bg-red-500
                rounded
                transition
              "
            >
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UsersTable;