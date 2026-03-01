"use client";

import { useToast } from "@/src/hooks";
import { useState } from "react";

interface Props {
  getUsers: () => Promise<void>;
};

export function CreateUserForm({ getUsers }: Props) {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function createUser() {
    try {
      const res = await fetch("/api/admin/user", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          role: "USER",
        }),
      });

      const data = await res.json();

      if (data.errors) throw new Error(data.errors?.map((e: any) => `${e.status}: ${e.message}`).join("\n"));

      await getUsers();

      showToast("User created", "success");
    } catch (error: any) {
      showToast(error.message, "error");
    };
  };

  return (
    <div className="mb-8 p-4 bg-zinc-900 rounded border border-white/10">
      <h2 className="text-lg mb-4">Create User</h2>

      <input
        placeholder="Email"
        className="block mb-2 p-2 bg-zinc-800 rounded w-full"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        className="block mb-2 p-2 bg-zinc-800 rounded w-full"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={createUser}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
      >
        Create
      </button>
    </div>
  );
};

export default CreateUserForm;