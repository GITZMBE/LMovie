"use client";

import { useSession } from "next-auth/react";

export function useIsLoggedIn() {
  const { data } = useSession();
  return !!data;
};

export default useIsLoggedIn;