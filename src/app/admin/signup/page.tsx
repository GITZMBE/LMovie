"use client";

import { useState } from "react";

export function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = async () => {
    await fetch("/api/admin/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  };

  return (
    <div className="p-8">
      <h1>Create User</h1>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCreate}>
        Create
      </button>
    </div>
  );
};

export default AdminSignup;