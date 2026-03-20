import { useToast } from '@/src/hooks';
import { User } from '@/src/models/prisma/client';
import { useState } from 'react';

interface Props {
  user: User;
  getUsers: () => Promise<void>;
}

export const UserItem = ({ user, getUsers }: Props) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const { showToast } = useToast();

  const updateUser = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/user/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          email: editEmail,
          password: editPassword || undefined,
        }),
      });
      const data = await res.json();

      if (data.errors) {
        for (const error of data.errors) {
          showToast(error.message, "error");
        }

        return;
      };

      setEditEmail("");
      setEditPassword("");
      setEditing(false);
      setShowPassword(false);
      showToast("User updated", "success");
      await getUsers();
    } finally {
      setLoading(null);
    }
  };

  async function deleteUser(id: string) {
    try {
      setLoading(id);

      const res = await fetch(`/api/admin/user/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.errors) {
        for (const error of data.errors) {
          showToast(error.message, "error");
        }

        return;
      };

      showToast('User deleted', 'success');
      await getUsers();
    } finally {
      setLoading(null);
    }
  }

  return (
    <li
      className="p-3 bg-zinc-900 rounded border border-white/10"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm">{user.email}</p>
          <p className="text-xs text-zinc-400">{user.role}</p>
        </div>

        <div className="flex gap-2">
          {user.role !== "ADMIN" && (
            <>
              <button
                onClick={() => {
                  setEditing(true);
                  setEditEmail(user.email);
                  setEditPassword("");
                }}
                disabled={loading === user.id}
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 rounded disabled:opacity-35"
              >
                Edit
              </button>

              <button
                onClick={() => deleteUser(user.id)}
                disabled={loading === user.id}
                className="px-3 py-1 text-sm bg-red-600/80 hover:bg-red-500 rounded disabled:opacity-35"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {editing && (
        <div className="mt-3 space-y-2">
          {/* Email */}
          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            disabled={loading === user.id}
            className="w-full p-2 bg-zinc-800 rounded border border-white/10 text-sm disabled:opacity-35"
            placeholder="New email"
          />

          {/* Password */}
          <div className="flex gap-2">
            <input
              type={showPassword ? "text" : "password"}
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              disabled={loading === user.id}
              className="w-full p-2 bg-zinc-800 rounded border border-white/10 text-sm disabled:opacity-35"
              placeholder="New password"
            />

            <button
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loading === user.id}
              className="px-2 text-xs bg-zinc-700 rounded"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => updateUser(user.id)}
              disabled={loading === user.id}
              className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-sm disabled:opacity-35"
            >
              Save
            </button>

            <button
              onClick={() => setEditing(false)}
              disabled={loading === user.id}
              className="px-3 py-1 bg-zinc-700 rounded text-sm disabled:opacity-35"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </li>
  )
};

export default UserItem;