"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/src/components/ui/PageContainer";

export function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (!res?.error) {
      router.push("/");
    }
  };

  return (
    <PageContainer className="flex flex-col gap-6 justify-center items-center">
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4 w-80">
        <input
          placeholder="Email"
          className="block mb-2 p-2 bg-zinc-800 rounded w-full"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="block mb-2 p-2 bg-zinc-800 rounded w-full"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button className="w-full backdrop-blur-md backdrop-brightness-50 text-white p-2 rounded">
          Login
        </button>
      </form>
    </PageContainer>
  );
};

export default LoginPage;